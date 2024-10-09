const express =require("express")
const router = express.Router()
const User = require("../models/user.js")


router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send("Todos los campos son obligatorios");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("El usuario ya está registrado");
        }

        const user = new User({ first_name, last_name, email, age, password });
        await user.save();

        res.redirect("/login");
    } catch (error) {
        console.error("Error de registro:", error); 
        res.status(500).send("Error de registro");
    }
});


module.exports=router