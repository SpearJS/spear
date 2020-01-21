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
                // filter the request here
                // check all credentials and middleware

                var controllerResponse = result.controller(req, res);
                console.log(`${req.method} ${uri.pathname} ${controllerResponse.statusCode} HTTP/1.1`);
                if(res.__proto__ === controllerResponse.__proto__){
                    // controller response with `res` object
                    return controllerResponse;
                }
                // controller response with custom 'httpResponse' api
                res.writeHead(controllerResponse.statusCode, controllerResponse.header);
                if(typeof controllerResponse.body !== 'undefined'){
                    res.write(controllerResponse.body);
                }
                return res.end();
            }
            else{
                return serverError(req,res);
            }
        }
    }).listen(3001);
}


module.exports = server;