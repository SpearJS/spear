function Authorize() {
    
}



Authorize.prototype.useRoles=function(roles=[]){

    return (req,res,next)=>{        
        if(!roles.includes(req.user.role))
            res.status(401).send()
        else     
            next()
    }
} 

Authorize.prototype.useGroups=function(groups=[]){

    return (req,res,next)=>{        
        if(!groups.includes(req.user.group))
            res.status(401).send()
        else     
            next()
    }
}

Authorize.prototype.usePolicy=function(policy=[]){
    return (req,res,next)=>{        
        if(!policy.includes(req.user.policy))
            res.status(401).send()
        else     
            next()
    }
} 

module.exports=new Authorize()