const express=require('express');
const router=express.Router()
// const User=require("..//module/user")
const User=require("..//module/user")
var jwt = require('jsonwebtoken')
const privateKey="asdfghjklmnopqrstuvwxyzABCDEFGH"
const newToken=(user)=>{
    return jwt.sign({user:user},privateKey)

}
const register=async (req,res) => {
    try{
        let user=await User.findOne({email:req.body.email}).lean().exec();
        if(user){
            return res.status(400).send("Email is already registered")
        }
        else{
            let user=await User.create(req.body)
            const token=newToken(user)
            console.log(user,token);

            return res.status(200).send({token,user})
    
        }

        //
    }
    catch(err) {
        return res.status(404).send(err.message)
    }

}
const login=async (req, res) => {
    try{
        const user=await User.findOne({email:req.body.email}).lean().exex()
        if(!user){
            return res.status(404).send("email is not oresent")
        }
        const match=User.checkPassword(req.body.password)
        if(!match){
            return res.status(404).send("password is not oresent")
        }
        const token=newToken(user)
        return res.status(200).send({token,user})

    }
    catch (err){
        return  res.status(400).send(err.message)
    }
}
module.exports={login,register}