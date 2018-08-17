var http = require("http");
var url = require("url");
function start(route,handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    if(pathname == "/favicon.ico")
       return;
    console.log("Request for " + pathname + " received.");
    var json = query.parse(url.parse(request.url).query);
    console.log(json);
    route(handle,pathname,response,json);
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
  console.log("goto http://127.0.0.1:8888/start");
}
exports.start = start;