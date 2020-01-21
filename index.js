var server = require('./core/server');
var router = require('./core/router').router;
let cors=require('./core/builtinMiddleware/cors')
let cookie=require('./core/builtinMiddleware/cookies')

var routing = function(){
        router.get('/user/', function(req, res){            
            // res.writeHead(200, {});
            res.write('I am OK!');
            return res.end();
        });

        router.post('/user-2/', function(req, res){
            res.writeHead(200, {});
            res.write('Curl OK!');
            return res.end();
        },(req,res,next)=>{console.log("m2")})
}

server.use(cookie.setCookie("name","akash",{"Expires":"Wed, 21 Oct 2021 07:28:00 GMT","httpOnly":true}))
server.use(cookie.setCookie("token","akash"))

server.use(cors.allowAnyOrigin())
server.use((req,res,next)=>{console.log("m1"),next()},routing())

server.start();
