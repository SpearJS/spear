var server = require('./core/server');
var router = require('./core/router').router;
var httpResponse = require('./core/response');

var routing = function(){
    router.get('user/1', function(req, res){
        // res.writeHead(404, {});
        // res.write('Not Found !!!!!');
        // return res.end();
        return httpResponse.NotFound();
    });

    router.post('/',function(req, res){
        return httpResponse.OK('OK');
    });
}
// map routes before starting the server
routing();
server.start();