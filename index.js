var server = require('./core/server');
var router = require('./core/router').router;
let cache=require('./core/builtinMiddleware/http/cache')
let cookie=require('./core/builtinMiddleware/http/cookies')
let cors=require('./core/builtinMiddleware/http/cors')


var routing = function(){
    router.get('/api/user/1/', function(req, res){
        // res.writeHead(404, {});
        // res.write('Not Found !!!!!');
        // return res.end();
        console.log("hello");
        res.setCookie("token2","Token2===",{"Expires":"Wed, 21 Oct 2021 07:28:00 GMT","httpOnly":true})
        res.setCacheControl("no store")

        return res.Accepted('wow');
    },{"middlware":[(req,res,next)=>{console.log("m5");next()},(req,res,next)=>console.log("m6")]});

}

// map routes before starting the server
server.use(cache.useCacheControl())
server.use(cookie.useCookie())
server.use(cors.allowAnyOrigin())
server.use('/api',(req,res,next)=>{console.log("m3"),next()},(req,res,next)=>{console.log("m4"),next()})
server.use((req,res,next)=>{console.log("m1"),next()},'/api',(req,res,next)=>{console.log("m2"),next()})

routing();
server.start();

