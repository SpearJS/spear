var server = require('./core/server');
var router = require('./core/router').router;

var routing = function(){
    router.get('/user/', function(req, res){
        res.writeHead(200, {});
        res.write('I am OK!');
        return res.end();
    });

    router.post('/user/', function(req, res){
        res.writeHead(200, {});
        res.write('Curl OKEY!');
        return res.end();
    })
}

server.start();
routing();