import error from 'http-errors'
import mongoose from 'mongoose'
import { Contact } from '../../model/contacts.js'

const { NotFound } = error

export const getById = async (req, res) => {
  const { contactId } = req.params

  let contact = null
  if (mongoose.isValidObjectId(contactId)) {
    contact = await Contact.findById(contactId)
  }

  if (!contact) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ message: 'success', contact })
}
