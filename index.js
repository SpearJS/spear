var server = require('./core/server');
var router = require('./core/router').router;
let cors=require('./core/builtinMiddleware/cors')

var routing = function(){
        router.get('/user/', function(req, res){            
            res.writeHead(200, {});
            res.write('I am OK!');
            return res.end();
        });

        router.post('/user-2/', function(req, res){
            res.writeHead(200, {});
            res.write('Curl OK!');
            return res.end();
        },(req,res,next)=>{console.log("m2")})
}

server.use(cors.allowAnyOrigin())
server.use((req,res,next)=>{console.log("m1"),next()},routing())

server.start();
