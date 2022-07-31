const express=require('express');
const app=express()
const {login,register}=require("./moduleControl/userControl")
app.use(express.json())
app.post("/login",login)
app.post("/register",register)

module.exports =app