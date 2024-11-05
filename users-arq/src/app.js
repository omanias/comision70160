const express = require("express")
const usersRouter = require("./routes/users.js")

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/users", usersRouter)
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 8080")
})
