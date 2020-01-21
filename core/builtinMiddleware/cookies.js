function Cookie(){
}

Cookie.prototype.setCookie=function( cookieName,cookie,cookiesConfig={}){
    let cookieString=""
    cookieString=`${cookieName}=${cookie};`
    let keys=Object.keys(cookiesConfig)

    keys.forEach(key=>{
        if(typeof cookiesConfig[key]==="boolean" && cookiesConfig[key]===true)
            cookieString=cookieString+`${key};`
        else 
            cookieString=cookieString+`${key}=${cookiesConfig[key]};`
    })

    return (req,res,next)=>{
        let cookieContainer=[]
        if(!!req.cookieContainer)
            cookieContainer=req.cookieContainer

        cookieContainer.push(cookieString)
        req.cookieContainer=cookieContainer
        res.setHeader('Set-Cookie',req.cookieContainer)
        next()
    }
}

module.exports=new Cookie()