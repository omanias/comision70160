import contactsModel from './models/Contacts.js';

export default class Contacts {
    constructor() { }

    // Método para obtener todos los contactos
    get = async () => {
        let contacts = await contactsModel.find();
        return contacts;
    }

    // Método para crear un nuevo contacto
    createContact = async (contact) => {
        const newContact = new contactsModel(contact);  // Crea una nueva instancia del modelo
        await newContact.save();  // Guarda el contacto en la base de datos
        return newContact;  // Devuelve el contacto creado
    }
}
