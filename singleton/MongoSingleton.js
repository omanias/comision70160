const mongoose = require("mongoose");

// URI de conexión a MongoDB
const URI = "mongodb+srv://omarmanias:1234562024@cluster0.bxjfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Variable para almacenar la instancia de la conexión
let instance = null;

class MongooseSingleton {
    static async getInstance() {
        // Si la instancia ya existe, devolvemos esa conexión
        if (instance) {
            return instance;
        }

        try {
            // Configuramos opciones de conexión y establecemos la conexión
            instance = await mongoose.connect(URI, {});

            console.log("Conexión a MongoDB con Mongoose establecida correctamente");

            return instance;
        } catch (error) {
            console.error("Error al conectar a MongoDB con Mongoose:", error);
            throw error;
        }
    }
}

module.exports = MongooseSingleton;
