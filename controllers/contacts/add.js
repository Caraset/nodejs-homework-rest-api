import { Contact } from '../../model/contacts.js'

export const add = async (req, res) => {
  const { id } = req.user
  const contact = await Contact.create({ ...req.body, owner: id })
  res.status(201).json({ message: 'success', contact })
}
