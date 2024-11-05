const MongooseSingleton = require("./MongoSingleton.js");
const mongoose = require("mongoose");

// Define un esquema y modelo de ejemplo
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    edad: Number
});
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function main() {
    try {
        // Obtiene la instancia de la conexión usando el Singleton
        await MongooseSingleton.getInstance();

        // Utiliza el modelo para interactuar con la base de datos
        const usuarios = await Usuario.find();
        console.log("Usuarios:", usuarios);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
