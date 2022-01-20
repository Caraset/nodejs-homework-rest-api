import { Contact } from '../../model/contacts.js'

export const add = async (req, res) => {
  const contact = await Contact.create(req.body)
  res.status(201).json({ message: 'success', contact })
}
