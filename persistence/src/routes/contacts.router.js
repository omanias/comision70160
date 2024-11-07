import { Router } from "express";
import { Contacts, initializeContacts } from "../dao/factory.js";
import ContactDTO from "../dao/DTOs/contact.dto.js";

const router = Router();

initializeContacts().then(() => {
    const contactsService = new Contacts();

    router.get("/", async (req, res) => {
        try {
            let result = await contactsService.get();
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(500).send({ status: "error", message: error.message });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const { name, last_name, phone } = req.body;
            const contact = new ContactDTO({ name, last_name, phone });
            let result = await contactsService.createContact(contact);
            res.status(201).send({ status: "success", payload: result });
        } catch (error) {
            res.status(500).send({ status: "error", message: error.message });
        }
    });
}).catch((error) => {
    console.error("Error initializing contacts service:", error);
    process.exit(1); // Finaliza el proceso si no se pudo inicializar correctamente
});

export default router;
