function Cache(){
}

Cache.prototype.useCacheControl=function(cacheConfig){
    return (req,res,next)=>{
        if(cacheConfig.length)
            res.setHeader('Cache-Control',cacheConfig)
        res.setCacheControl=(cacheConfig={})=>this.setCacheControl(cacheConfig,res)
        next()
    }
}

Cache.prototype.setCacheControl=function(cacheConfig,res){
        res.setHeader('Cache-Control',cacheConfig)
}

module.exports=new Cache()