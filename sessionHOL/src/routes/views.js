const express = require("express")
const router = express.Router()

router.get("/profile", (req,res)=>{
     if(!req.session.user){
     res.redirect("/login")
    } 
    const {first_name, last_name, email, age, password} = req.session.user
     res.render("profile", {first_name, last_name, email, age}) 
    res.send("req.session.user")
})


router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/register", (req,res)=>{
    res.render("register")
})


module.exports=router