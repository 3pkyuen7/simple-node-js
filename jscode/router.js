function route(handle, pathname, request, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](request,response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("404 not found");
  }
  
}
exports.route = route;  