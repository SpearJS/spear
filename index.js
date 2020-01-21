var server = require('./core/server');
var router = require('./core/router').router;
var httpResponse = require('./core/response');

var routing = function(){
    router.get('/user/', function(req, res){
        // res.writeHead(404, {});
        // res.write('Not Found !!!!!');
        // return res.end();
        return httpResponse.NotFound();
    });

    router.post('/user/',function(req, res){
        return httpResponse.OK('OK');
    });
}

server.start();
routing();