var fs = require('fs');
var formidable = require('formidable');
var https = require('https');
function start(request,response) {
    console.log("Request handler start was called.");
    var page = fs.readFileSync('./html/welcome.html','utf8');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(page);
}

function uploadPage(request,response) {
    console.log("Request handler uploadPage was called.");
    response.writeHead(200, { "Content-Type": "text/html" });
    var page = fs.readFileSync('./html/uploadform.html','utf8');
    response.end(page);
    console.log("testing message func");
}

async function downloadPage(request,response){ // example of async
    console.log("Request downloadPage was called.");
    // start create a page
    var dir = "storage/files"
    var page = "";
    page += "<!DOCTYPE html><html lang=\"en\">";
    page += "<head><meta charset=\"UTF-8\"><title>Login</title></head><body>";
    await fs.readdir(dir,function(err,files){
        for(let i = 0;i< files.length; i++){
        page += files[i]+"<br>";
        console.log(files.length);
        }
        page += "</body></html>"
        console.log("downloadpage end");
        response.end(page);
    });
}

function messagePage(request,response){
    console.log("Request handler messagePage was called.");
    var page = fs.readFileSync('./html/messageform.html','utf8');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(page);
    console.log("messagepage ends");
}

function loginPage(request,response){
    console.log("Request uploadPage was called.");
    var page = fs.readFileSync('./html/loginPage.html','utf8');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(page);
}

function message(request,response){
    console.log("Request handler message was called.");
    // handle request
    var body = "";
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        request.on('end', () => {
            console.log(body);
            fs.appendFile('storage/textFiles/MessageLog', body + '\n', (err) => {
                console.log('The file has been saved!');
            });
        });
    // end handling
    console.log("message ends")
    response.end();
}

function upload(request,response){
    console.log("Request handler upload was called.");
    uploadFile(request);
    response.end();
} 

function uploadFile(request,response){
    console.log("Request handler uploadFile was called.");
    if(request.method === 'POST'){
        var form = new formidable.IncomingForm();
        console.log("about to parse");
        form.parse(request, function(error, fields, files) {
            console.log("parsing done");
            var readStream = fs.createReadStream(files.filetoupload.path)
            var writeStream = fs.createWriteStream("./storage/files/"+files.filetoupload.name);
            readStream.pipe(writeStream);
            readStream.on("end", function() {
                fs.unlinkSync(files.filetoupload.path);
                console.log("upload succeed");
            });// Operation done
        });
    }
}

function download(request,response){
    console.log("Request handler download was called.");
    downloadFile(request,response);
}

function downloadFile(request,response){
    console.log("Request handler downloadFile was called.");
    //
    response.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + "testing.png"
    });
    fs.createReadStream("./storage/files/testpng.png").pipe(response);
    response.end;
}


function login(request,response){
    console.log("Request handler login was called.");
    if(request.method === 'POST'){
        var body;
        request.on('data', (chunk) => {
            var content = chunk.toString();
            content = content.replace("\r\n","");
            var arr = content.split("=");
            body = arr[1];
            console.log(arr);
        });
        request.on('end', () => {
            response.end(body);
        });
    }
}

function fetch(request,response){
    https.get(
            {
            hostname: 'hk.yahoo.com',
            port: 443,
            path: '/',
            method: 'GET'
        },
        /*
        port: 80,
        path: '/',
        */
        (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              try {
                response.end(rawData);
              } catch (e) {
                console.error(e.message);
              }
            });
        // Do stuff with response
    });
}

exports.start = start;
exports.uploadPage = uploadPage;
exports.downloadPage = downloadPage;
exports.messagePage = messagePage;
exports.loginPage = loginPage;
exports.message = message;
exports.upload = upload;
exports.download = download;
exports.login = login;
exports.fetch = fetch;
