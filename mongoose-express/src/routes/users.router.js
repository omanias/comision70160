const {Router} = require("express")
const { userModel } = require("../models/user.model.js")

const router = Router()

router.get("/", async(req,res)=>{
    try {
        let users = await userModel.find()
        res.send({result:"success", payload:users})
    } catch (error) {
        console.error(error)
    }
})

router.post("/", async(req,res)=>{
    let {nombre, apellido,email} = req.body
    if(!nombre || !apellido || !email){
        res.send({status:"error", error: "Faltan parámetros"})
    }
    let result = await userModel.create({nombre, apellido, email})
    res.send({result:"success", payload:result})
})

router.put("/:uid", async(req,res)=>{
    let {uid} = req.params

    let userToReplace = req.body
    if(!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email){
    res.send({status: "error", error: "Faltan parámetros"})
}
    let result = await userModel.updateOne({_id:uid}, userToReplace)
    res.send({result:"success", payload:result})
})

router.delete("/:uid", async(req,res)=>{
 let {uid}= req.params
 let result = await userModel.deleteOne({_id:uid})
 res.send({result: "success", payload:result})
})

module.exports=router