import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware para validacion de politicas

const handlePolicies = (policies) => {
    return (req, res, next) => {
        if (policies.includes("PUBLIC")) {
            next()
        } else {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json({ message: "Token no ha sido proporcionado" })
            }

            try {
                const decoded = jwt.verify(token.split(" ")[1], "coderSecret")
                if (policies.includes(decoded.role)) {
                    next()
                } else {
                    return res.status(403).json({ message: "Acceso dengado por politicas insuficientes" })
                }
            } catch (error) {
                return res.status(401).json({ message: "Token de autorización inválido" })
            }
        }
    }
}

const sessionRouter = express.Router()

sessionRouter.post("/login", (req, res) => {
    // Hardcodear el usuario
    const user = { id: 1, username: "usuarios", role: "user" }
    const token = jwt.sign(user, "coderSecret", { expiresIn: "1h" })
    res.json({ token })
})

const userRouter = express.Router()

// Ruta privada para usuarios con token de privilegio

userRouter.get("/user", handlePolicies(["user"]), (req, res) => {
    res.json({ message: "Acceso a la ruta exitosa" })
})

userRouter.get("/public", handlePolicies(["PUBLIC"]), (req, res) => {
    res.json({ message: "Acceso a la ruta pública" })
})

app.use("/session", sessionRouter)
app.use("/user", userRouter)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

