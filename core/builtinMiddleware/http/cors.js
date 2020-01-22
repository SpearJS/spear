function Cors(){}


Cors.prototype.allowOrigin=(origins)=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin',origins)
        next()
    }
}

Cors.prototype.allowAnyOrigin=()=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin',"*")
        next()
    }
}


Cors.prototype.allowAnyHeaders=()=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Headers',"*")
        next()
    }
}

Cors.prototype.allowHeaders=(headers)=>{
    
}

Cors.prototype.allowAnyMethods=()=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Methods',"*")
        next()
    }
}

Cors.prototype.allowMethods=(methods)=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Methods',methods)
        next()
    }
}


Cors.prototype.allowCredentials=()=>{
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Credentials',true)
        next()
    }
}

module.exports=new Cors()