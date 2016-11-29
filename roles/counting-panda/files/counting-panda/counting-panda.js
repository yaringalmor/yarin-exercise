#!/usr/bin/env nodejs

//Variable initialization
var http = require('http');
var workdir = '/opt/bigpanda/counting-panda/';
var config = require(workdir + 'config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var counter = 0;
var title = "Number of GET requests for this site: ";

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/", function(request, response) {
    if (request.method === 'GET'){
        counter++;
        console.log(counter);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(title + counter.toString());
    }
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
