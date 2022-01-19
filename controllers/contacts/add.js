// import { addContact } from '../../model/index.js'
import { Contact } from '../../models/contacts.js'

export const add = async (req, res) => {
  // const contact = await addContact(req.body)
  const contact = await Contact.create(req.body)
  res.status(201).json({ message: 'success', contact })
}
