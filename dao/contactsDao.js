import { Contact } from '../model/contacts.js'

const addContact = async contact => Contact.create(contact)

const getAllContacts = async (user, projection, options) =>
  Contact.find(user, projection, options)

const getContactById = async id => Contact.findById(id)

const getContactByIdAndRemove = async id => Contact.findByIdAndRemove(id)

const getContactByIdAndUpdate = async (id, payload, options) =>
  Contact.findByIdAndUpdate(id, payload, options)

export default {
  getAllContacts,
  addContact,
  getContactById,
  getContactByIdAndRemove,
  getContactByIdAndUpdate,
}
