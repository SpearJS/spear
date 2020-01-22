

function MiddlewarePipeline(){
    this.mapper={}
}


// pipelining Pipeline
MiddlewarePipeline.prototype.use=function (path,callback){
    if(!(!!this.mapper[path]))
        this.mapper[path]=[]
    this.mapper[path].push(callback)
}


// applying Pipeline
MiddlewarePipeline.prototype.apply=function (path,req,res){
    let middlewareList=this.mapper[path]
    
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
