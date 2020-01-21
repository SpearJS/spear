var server = require('./core/server');
var router = require('./core/router').router;
let cors=require('./core/builtinMiddleware/cors')
let cookie=require('./core/builtinMiddleware/cookies')
let cache=require('./core/builtinMiddleware/cache')


var routing = function(){
        router.get('/user/', function(req, res){            
            // res.writeHead(200, {});
            res.setCookie("token2","Token2===",{"Expires":"Wed, 21 Oct 2021 07:28:00 GMT","httpOnly":true})
            res.setCacheControl("no cache")
            res.write('I am OK!');
            return res.end();
        });
        router.post('/user-2/', function(req, res){
            res.writeHead(200, {});
            res.write('Curl OK!');
            return res.end();
        },(req,res,next)=>{console.log("m2")})
}

server.use(cache.useCacheControl("public,max-age=0"))
server.use(cookie.useCookie("name","akash",{"Expires":"Wed, 21 Oct 2021 07:28:00 GMT","httpOnly":true}))
// server.use(cookie.useCookie("token1","Token1==="))

server.use(cors.allowAnyOrigin())
server.use((req,res,next)=>{console.log("m1"),next()},routing())

server.start();
