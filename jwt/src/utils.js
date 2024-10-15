const jwt = require("jsonwebtoken")

const PRIVATE_KEY = "myprivatekey"

const generateToken =(user)=>{
    return jwt.sign({user}, PRIVATE_KEY)
}


//Middleware para la ruta y validacion

const authToken =(req,res,next)=>{
    const token = req.headers["authorization"]
    if(token){
        jwt.verify(token, PRIVATE_KEY,(err,user)=>{
            if(err){
                res.sendStatus(403)
            }else{
                req.user = user
                next()
            }
        })
    }else{
        res.sendStatus(401)
    }
}

module.exports={
    generateToken,
    authToken
}