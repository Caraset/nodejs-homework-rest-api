import error from 'http-errors'
import { getContactById } from '../../model/index.js'

const { NotFound } = error

export const getById = async (req, res) => {
  const { contactId } = req.params

  const contact = await getContactById(contactId)
  if (!contact) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ message: 'success', contact })
}
