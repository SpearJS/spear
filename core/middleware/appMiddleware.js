let middlewarePipeline=require('./middlewarePipeline')

// let routeMidleware=require('./routerMiddleware')

function AppMiddleware(){
    
}

AppMiddleware.prototype.use = (...callbacks)=> {
    let index=0;
    let path=''

    while (index<callbacks.length) {
        if(typeof callbacks[index]!=='function')
        {
            path=path+callbacks[index]
        }
        else{
            middlewarePipeline.use(path,callbacks[index])
        }
        index++;
    }
};


module.exports=new AppMiddleware()