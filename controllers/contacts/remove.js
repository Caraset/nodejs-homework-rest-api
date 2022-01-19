import error from 'http-errors'
import mongoose from 'mongoose'
import { Contact } from '../../models/contacts.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const remove = async (req, res) => {
  const { contactId } = req.params

  let contact = null

  if (isValidObjectId(contactId)) {
    contact = await Contact.findByIdAndRemove(contactId)
  }

  if (!contact) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ message: 'contact deleted', contact })
}
