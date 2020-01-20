var __controllerMap = {
    GET : [],
    POST : [],
    PUT : [],
    DELETE : [],
    HEAD : [],
    PATCH : [],
    TRACE : [],
    OPTIONS : []
};

var router = router = {};

router.get = function GET(path, controller, options={}){
    __controllerMap.GET.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.post = function POST(path, controller, options={}){
    __controllerMap.POST.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.put = function PUT(path, controller, options={}){
    __controllerMap.PUT.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.delete = function DELETE(path, controller, options={}){
    __controllerMap.DELETE.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.head = function HEAD(path, controller, options={}) {
    __controllerMap.HEAD.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.patch = function PETCH(path, controller, options={}){
    __controllerMap.PATCH.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.trace = function TRACE(path, controller, options={}){
    __controllerMap.TRACE.push({
        path : path,
        controller : controller,
        options : options
    });
}

router.options = function OPTIONS(path, controller, options={}){
    __controllerMap.OPTIONS.push({
        path : path,
        controller : controller,
        options : options
    });
}


module.exports = {
    router : router,
    __controllerMap : __controllerMap
}