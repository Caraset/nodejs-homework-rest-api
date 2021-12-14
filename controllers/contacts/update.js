import error from 'http-errors'
import { updateContact } from '../../model/index.js'

const { NotFound, BadRequest } = error

export const update = async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req

  try {
    if (Object.keys(body).length === 0) {
      throw new BadRequest('Missing fields')
    }

    const contact = await updateContact(contactId, body)

    if (contact === 1) {
      throw new NotFound('Not found')
    }
    res.status(200).json({ message: 'success', contact })
  } catch (error) {
    next(error)
  }
}
