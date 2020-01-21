var http = require('http');
var url = require('url');
var __controllerMap = require('./router').__controllerMap;
var cleanPrefixSuffix = require('./router').cleanPrefixSuffix;


var serverError = function serverError(req, res, parsedUrl){
    console.log(`${req.method} ${parsedUrl.pathname} 500 HTTP/1.1`);
    res.writeHead(500, {});
    return res.end();
}


var server = {};

server.start = function start() {
    http.createServer(function(req, res){
        var parsedUrl = url.parse(req.url, true);
        if(typeof __controllerMap[req.method] === 'undefined'){
            // server error
            return serverError(req, res, parsedUrl);
        }
        else{
            var cleanUrl = cleanPrefixSuffix(parsedUrl.pathname); 
            var result = __controllerMap[req.method].find(item=> item.path === cleanUrl);
            if(result){            
                // filter the request here
                // check all credentials and middleware

                var controllerResponse = result.controller(req, res, parsedUrl);
                console.log(`${req.method} ${parsedUrl.pathname} ${controllerResponse.statusCode} HTTP/1.1`);
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
                return serverError(req,res, parsedUrl);
            }
        }
    }).listen(3001);
}


module.exports = server;