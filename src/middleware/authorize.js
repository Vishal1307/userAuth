const authorize=(permittedRole)=>{
    return (req,res, next)=>{
        const user=req.user
        isAllowed=false
        for(var i=0;i<user.roles.length;i++){
            if(permittedRole.includes(user.roles[i])){
                isAllowed=true
            }
        }
        if(isAllowed){
            return next()
        }
        else{
            return res.status(403).send("errror")
        }
    }
}
module.exports =authorize