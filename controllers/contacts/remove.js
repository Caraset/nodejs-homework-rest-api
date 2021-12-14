import error from 'http-errors'
import { removeContact } from '../../model/index.js'

const { NotFound } = error

export const remove = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await removeContact(contactId)
    if (!contact) {
      throw new NotFound('Not found')
    }
    res.status(200).json({ message: 'success', contact })
  } catch (error) {
    next(error)
  }
}
