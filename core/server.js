var http = require('http');
var url = require('url');
var __controllerMap = require('./router').__controllerMap;


var serverError = function serverError(req, res){
    res.writeHead(500, {});
    res.write('Server Error');
    return res.end();
}


var server = {};

server.start = function start() {
    http.createServer(function(req, res){
        var uri = url.parse(req.url, true);
        // @TODO handle the last slash '/' in url pathname
    
        if(typeof __controllerMap[req.method] === 'undefined'){
            // server error
            return serverError(req, res);
        }
        else{
            var result = __controllerMap[req.method].find(item=> item.path === uri.pathname);
            if(result){
                return result.controller(req, res);
            }
            else{
                return serverError(req,res);
            }
        }
    }).listen(3001);
}


module.exports = server;