import { listContacts } from '../../model/index.js'

export const getAll = async (req, res) => {
  const contacts = await listContacts()
  res.status(200).json({ message: 'success', contacts })
}
