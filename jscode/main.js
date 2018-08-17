var server = require("./serverUrl");
var router = require("./router");
var requestHandlers = require("./requestHandler");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/uploadPage"] = requestHandlers.uploadPage;
handle["/messagePage"] = requestHandlers.messagePage;
handle["/loginPage"] = requestHandlers.loginPage;
handle["/uploadFile"] = requestHandlers.uploadFile;
handle["/message"] = requestHandlers.message;
handle["/upload"] = requestHandlers.upload;
handle["/download"] = requestHandlers.download;
handle["/login"] = requestHandlers.login;
handle["/downloadPage"] = requestHandlers.downloadPage;
handle["/fetch"] = requestHandlers.fetch;
var os = require( 'os' );

var networkInterfaces = os.networkInterfaces();

console.log( networkInterfaces['Wi-Fi'] );
server.start(router.route,handle);