var http = require("http");
var url = require("url");
var query = require("querystring");
var data = "data : ";
function start(route,handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    // skip icon
    if(pathname == "/favicon.ico")
       return;
    //
    route(handle,pathname,request,response);
    console.log("Request for " + pathname + " received.");
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
  console.log("goto http://127.0.0.1:8888/start");
}

exports.start = start;