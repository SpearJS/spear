function Cookie(){

}

Cookie.prototype.setCookie=function(cookieName,cookie,cookiesConfig={},req,res){
        if (!!cookieName===true){
            cookieString=this.cookieFormat(cookieName,cookie,cookiesConfig,req)
            res.setHeader('Set-Cookie',req.cookieContainer)
        }
}


Cookie.prototype.useCookie=function(cookieName,cookie,cookiesConfig={}){
    
    return (req,res,next)=>{
        if (!!cookieName===true){
            cookieString=this.cookieFormat(cookieName,cookie,cookiesConfig,req)
            res.setHeader('Set-Cookie',req.cookieContainer)
        }
        res.setCookie=(cookieName,cookie,cookiesConfig={})=>this.setCookie(cookieName,cookie,cookiesConfig,req,res);
        next()
    }
}


Cookie.prototype.cookieFormat=function(cookieName,cookie,cookiesConfig={},req) {
    let cookieString=""
    cookieString=`${cookieName}=${cookie};`
    let keys=Object.keys(cookiesConfig)

    keys.forEach(key=>{
        if(typeof cookiesConfig[key]==="boolean" && cookiesConfig[key]===true)
            cookieString=cookieString+`${key};`
        else 
            cookieString=cookieString+`${key}=${cookiesConfig[key]};`
    })
    
    let cookieContainer=[]
    if(!!req.cookieContainer)
        cookieContainer=req.cookieContainer
 
    cookieContainer.push(cookieString)
    req.cookieContainer=cookieContainer
    return cookieString
}

module.exports=new Cookie()