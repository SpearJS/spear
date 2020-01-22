var server = require('./core/server');
var router = require('./core/router').router;

var routing = function(){
    router.get('user/1', function(req, res){
        // res.writeHead(404, {});
        // res.write('Not Found !!!!!');
        // return res.end();
        return res.Accepted('wow');
    });

    router.post('/',function(req, res){
        return res.OK('OK');
    });
}
// map routes before starting the server
routing();
server.start();