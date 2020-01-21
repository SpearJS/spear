function Cache(){
}

Cache.prototype.setCacheControl=function(cacheConfig){
    return (req,res,next)=>{
        res.setHeader('Cache-Control',cacheConfig)
        next()
    }
}

module.exports=new Cache()