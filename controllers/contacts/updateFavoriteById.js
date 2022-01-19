import error from 'http-errors'
import mongoose from 'mongoose'
import { Contact } from '../../model/contacts.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  let contact = null

  if (isValidObjectId(contactId)) {
    contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    )
  }

  if (!contact) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ message: 'success', contact })
}
