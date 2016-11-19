var http = require('http');
var config = require('./config.json');
var fs = require('fs');

var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();

dispatcher.setStatic('/resources');
dispatcher.setStaticDirname('resources');

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
