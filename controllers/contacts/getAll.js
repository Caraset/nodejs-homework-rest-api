import { Contact } from '../../model/contacts.js'

export const getAll = async (req, res) => {
  const { id } = req.user
  const contacts = await Contact.find({ owner: id })
  res.status(200).json({ message: 'success', contacts })
}
