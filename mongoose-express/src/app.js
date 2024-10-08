const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/users.router.js")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://omarmanias:1234562024@cluster0.bxjfm.mongodb.net/MisUsuarios?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error=>{
    console.error("Error al intentar conectar a la base de datos", error)
})

app.use("/", userRouter)


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})