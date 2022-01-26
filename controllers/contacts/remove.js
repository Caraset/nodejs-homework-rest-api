import error from 'http-errors'
import mongoose from 'mongoose'
import { Contact } from '../../model/contacts.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const remove = async (req, res) => {
  const { contactId } = req.params
  const { id: userId } = req.user

  const contact = await Contact.findById(contactId)
  const ownerId = contact?.owner.valueOf() || null

  if (!contact || userId !== ownerId) {
    throw new NotFound('Not found')
  }

  let deletedContact = null
  if (isValidObjectId(contactId)) {
    deletedContact = await Contact.findByIdAndRemove(contactId)
  }

  res.status(200).json({ message: 'contact deleted', contact: deletedContact })
}
