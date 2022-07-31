const jwt=require('jsonwebtoken')
const privateKey="asdfghjklmnopqrstuvwxyzABCDEFGH"

const verfiyaToken=(token)=>{
    return new Promise ((resolve,reject)=>{
        jwt.verify(token, privateKey,(err,decoded)=>{
            if(err){
               return reject(err)
            }
            else{
               return resolve(decoded)
            }

        })

    })
}
module.exports =(req,res,next)=>{
    if(!req?.headers?.authrization){
        return res.status(403).send("please provide valid authrization")
    }
    const bearerToken = req.headers.authrization
    if(!bearerToken.startsWith("Bearer ")){
        return res.status(403).send("Please provide a bearer token")
    }
    const token =bearerToken.split("")[1]
    let user;
    try{
        user=verfiyaToken(token)
        return res.status(200).send(user)

    }
    catch(e){
        return res.status(403).send(e.message)
    }

}
 