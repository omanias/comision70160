import mongoose from "mongoose";
process.loadEnvFile()

let Contacts;

let entorno = process.env.PERSISTENCE

console.log("Persistence option: ", entorno);

const initializeContacts = async () => {
    switch (entorno) {
        case "MONGO":
            await mongoose.connect("mongodb+srv://omarmanias:1234562024@cluster0.bxjfm.mongodb.net/prueba?retryWrites=true&w=majority&appName=Cluster0");
            const { default: ContactsMongo } = await import("./mongo/contacts.mongo.js");
            Contacts = ContactsMongo;
            break;
        case "MEMORY":
            const { default: ContactsMemory } = await import("./memory/contacts.memory.js");
            Contacts = ContactsMemory;
            break;
        default:
            throw new Error("No persistence option provided");
    }
};

export { Contacts, initializeContacts };
