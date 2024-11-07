import { initializeContacts, Contacts } from '../dao/factory.js';
import ContactRepository from './Contacts.repository.js';

await initializeContacts();
export const contactsService = new ContactRepository(new Contacts());