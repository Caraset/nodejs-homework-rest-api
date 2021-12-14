import { listContacts } from '../../model/index.js'

export const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ message: 'success', contacts })
  } catch (error) {
    next(error)
  }
}
