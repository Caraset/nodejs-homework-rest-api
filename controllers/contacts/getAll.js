import { Contact } from '../../model/contacts.js'

export const getAll = async (req, res) => {
  const contacts = await Contact.find({})
  res.status(200).json({ message: 'success', contacts })
}
