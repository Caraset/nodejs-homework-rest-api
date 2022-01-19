// import { listContacts } from '../../model/index.js'
import { Contact } from '../../models/contacts.js'

export const getAll = async (req, res) => {
  const contacts = await Contact.find({})
  // const contacts = await listContacts()
  res.status(200).json({ message: 'success', contacts })
}
