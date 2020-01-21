var http = require('http');
var url = require('url');
let appMiddleware=require('../core/middleware/appMiddleware')
let cors=require('../core/builtinMiddleware/cors')
let cookie=require('../core/builtinMiddleware/cookies')
let cache=require('../core/builtinMiddleware/cache')


var __controllerMap = require('./router').__controllerMap;

// middleware
let middleware=require('./middleware/middleware')

var serverError = function serverError(req, res){
    res.writeHead(500, {});
    res.write('Server Error');
    return res.end();
}


var server = {};

server.start = function start() {
    http.createServer(function(req, res){
        var uri = url.parse(req.url, true);
        // apply 'root=/' middleware
        middleware.apply('',req,res)
        // @TODO handle the last slash '/' in url pathname
        
        if(typeof __controllerMap[req.method] === 'undefined'){
            // server error
            return serverError(req, res);
        }
        else{
            var result = __controllerMap[req.method].find(item=> item.path === uri.pathname);
            if(result){
                // applying middleware in route
                if(typeof result.options==='function'){
                    appMiddleware.use(result.path,result.options(req,res,next))
                    middleware.apply(result.path,req,res)
                }
                return result.controller(req, res);
            }
            else{
                return serverError(req,res);
            }
        }
    }).listen(3001);
}


server.use=appMiddleware.use



module.exports = server;