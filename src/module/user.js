const mongoose = require('mongoose');
const bycrpt=require("bcrypt")
const userSchema=new mongoose.Schema({
    email:{type:String, required:true}, 
    password:{type:String, required:true}

},{
    versionKey:false,
    timestamps:true
})
userSchema.pre("save",(next)=>{
    // if(!this.isModified("password")) return next()

    this.password=bycrpt.hashSync(this.password,8) 
    return next()

})
userSchema.methods.checkPassword=(password)=>{
    return bycrpt.compareSync(this.password,password)
}
module.exports=mongoose.model('User', userSchema)