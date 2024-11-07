export default class Contacts {
    constructor() {
        this.data = [];  // Arreglo que guarda los contactos en memoria
    }

    // Método para obtener todos los contactos
    get = () => {
        return this.data;  // Devuelve todos los contactos almacenados en memoria
    }

    // Método para crear un nuevo contacto
    createContact = (contact) => {
        this.data.push(contact);  // Agrega el nuevo contacto al arreglo
        return contact;  // Devuelve el contacto creado
    }
}
