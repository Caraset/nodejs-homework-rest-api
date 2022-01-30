import error from 'http-errors'
import mongoose from 'mongoose'

import contactsDao from '../../dao/contactsDao.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const { id: userId } = req.user

  const contact = await contactsDao.getContactById(contactId)
  const ownerId = contact?.owner.valueOf()

  if (!contact || userId !== ownerId) {
    throw new NotFound('Not found')
  }

  let updatedContact = null

  if (isValidObjectId(contactId)) {
    updatedContact = await contactsDao.getContactByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    )
  }

  res.status(200).json({ message: 'success', contact: updatedContact })
}
