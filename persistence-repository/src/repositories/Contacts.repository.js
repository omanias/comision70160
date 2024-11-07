import ContactDTO from '../dao/DTOs/contact.dto.js'

export default class ContactRepository {
    constructor(dao) {
        this.dao = dao
    }

    getContacts = async () => {
        let result = await this.dao.get()
        return result
    }

    createContact = async (contact) => {
        let contactToInsert = new ContactDTO(contact)
        let result = await this.dao.create(contactToInsert)
        return result
    }
}