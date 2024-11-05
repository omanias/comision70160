import express from 'express'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

class UserRouter {
    constructor() {
        this.router = express.Router()
        this.router.use(this.middleware)
        this.router.get("/", this.getHomePage)
        this.router.get("/perfil", this.getProfile)
        this.router.get("/configuracion", this.getSettings)
    }

    middleware(req, res, next) {
        console.log("Middleware de usuarios")
        next()
    }

    getHomePage(req, res) {
        res.send("Pagina de inicio")
    }

    getProfile(req, res) {
        res.send("Pagina del perfil del usuario")
    }

    getSettings(req, res) {
        res.send("Pagina de configuracion")
    }
}

const userRouter = new UserRouter()

app.use("/usuarios", userRouter.router)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

