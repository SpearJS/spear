var server = require('./core/server');
var router = require('./core/router').router;
var httpResponse = require('./core/response');

let cache=require('./core/builtinMiddleware/http/cache')
let cookie=require('./core/builtinMiddleware/http/cookies')
let cors=require('./core/builtinMiddleware/http/cors')

var routing = function(){
    router.get('/api/user2/', function(req,res){
        console.log("hello");
        res.setCookie("token2","Token2===",{"Expires":"Wed, 21 Oct 2021 07:28:00 GMT","httpOnly":true})
        res.setCacheControl("no store")
        return httpResponse.NotFound("not found");
    },()=>console.log("user2 middle"));
    router.post('/user-2/',function(req, res){
        return httpResponse.OK('OK');
    });
}

server.use(cache.useCacheControl())
server.use(cookie.useCookie())
server.use(cors.allowAnyOrigin())
server.use('/api/user2/',(req,res,next)=>{console.log("akash");next()})
server.use((req,res,next)=>{console.log("m1");next()},routing())
server.start();