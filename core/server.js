var http = require('http');
var url = require('url');
let requestMiddleware=require('./middleware/requestMiddleware')
let middlewarePipeline=require('./middleware/middlewarePipeline')



var __controllerMap = require('./router').__controllerMap;
var cleanPrefixSuffix = require('./router').cleanPrefixSuffix;
let Response = require('./response');

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
                
                // Middleware
                // use route middleware
                let routeMiddlewareList=[]
                if(!!result.options["middlware"]===true)
                    routeMiddlewareList=result.options["middlware"] 
                
                    let usePath=result.path
                if(result.path[result.path.length-1]==='/')
                    usePath=result.path.substring(0,result.path.length-1)
                    
                routeMiddlewareList.forEach(middlware => {
                    if(typeof middlware==='function'){
                        requestMiddleware.use(usePath,middlware)
                    } 
                });           
                // applying middleware
                middlewarePipeline.apply(parsedUrl.pathname,req,res)
                middlewarePipeline.clearMapper(usePath)
                // Middleware
                
          
                let controllerResponse = result.controller(req,res);
                console.log(`${req.method} ${parsedUrl.pathname} ${controllerResponse.statusCode} HTTP/1.1`);
                return controllerResponse;
            }
            else{
                return serverError(req,res, parsedUrl);
            }
        }
    }).listen(3001);
}


server.use=requestMiddleware.use



module.exports = server;