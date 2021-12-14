import { addContact } from '../../model/index.js'

export const add = async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    res.status(201).json({ message: 'success', contact })
  } catch (error) {
    next(error)
  }
}
