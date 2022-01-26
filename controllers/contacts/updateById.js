import error from 'http-errors'
import mongoose from 'mongoose'
import { Contact } from '../../model/contacts.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const updateById = async (req, res) => {
  const { contactId } = req.params
  const { id: userId } = req.user

  const contact = await Contact.findById(contactId)
  const ownerId = contact?.owner.valueOf()

  if (!contact || userId !== ownerId) {
    throw new NotFound('Not found')
  }

  let updatedContact = null

  if (isValidObjectId(contactId)) {
    updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })
  }

  res.status(200).json({ message: 'success', contact: updatedContact })
}
