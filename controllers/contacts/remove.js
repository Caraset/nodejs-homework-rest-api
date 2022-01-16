import error from 'http-errors'
import { removeContact } from '../../model/index.js'

const { NotFound } = error

export const remove = async (req, res) => {
  const { contactId } = req.params

  const contact = await removeContact(contactId)
  if (!contact) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ message: 'contact deleted', contact })
}
