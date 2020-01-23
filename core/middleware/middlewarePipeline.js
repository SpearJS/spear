

function MiddlewarePipeline(){
    this.mapper={}
}

MiddlewarePipeline.prototype.clearMapper=function (path) {
    this.mapper[path]=[]
}

MiddlewarePipeline.prototype.getContextMiddlewareList=function(uriPath) {
    let paths=uriPath.split('/')
    if(paths.length>1 && paths[paths.length-1].length===0)
        paths.pop()
    
    let middlewareList=[]
    let currentPath=""
    
    paths.forEach(path=>{    
        if(path!=="")
            currentPath=currentPath+'/'+path
        console.log("Path = ",currentPath,' middleware = ',this.mapper[currentPath]);        
        if(!!this.mapper[currentPath]===true)
        {
            middlewareList=[...middlewareList,...this.mapper[currentPath]]
        }
    })
    
    return middlewareList;
}

// pipelining Pipeline
MiddlewarePipeline.prototype.use=function (path,callback){
    if(!(!!this.mapper[path]))
        this.mapper[path]=[]
    this.mapper[path].push(callback)
}


// applying Pipeline
MiddlewarePipeline.prototype.apply=function (uriPath="",req,res){
    let middlewareList=[]
    middlewareList=this.getContextMiddlewareList(uriPath)

    if(!!middlewareList===false)
        return
        
    middlewareList.every((callback)=>{
        let breakMiddleware=true
        callback(req,res,next=()=>{
            breakMiddleware=false
        })
        if (breakMiddleware) {
            return false
        }
        return true
    })
}

module.exports=new MiddlewarePipeline()
