#!/usr/bin/env nodejs

//Variable initialization
var http = require('http');
var workdir = '/opt/bigpanda/static-panda/'; 
var config = require(workdir + 'config.json');
var fs = require('fs');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();

//Setting http server for serving static files from 'resources' directory
dispatcher.setStatic('/resources');
dispatcher.setStaticDirname(workdir + 'resources');

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
