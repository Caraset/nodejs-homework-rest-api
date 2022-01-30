import error from 'http-errors'
import mongoose from 'mongoose'
import contactsDao from '../../dao/contactsDao.js'

const { NotFound } = error
const { isValidObjectId } = mongoose

export const remove = async (req, res) => {
  const { contactId } = req.params
  const { id: userId } = req.user

  const contact = await contactsDao.getContactById(contactId)
  const ownerId = contact?.owner.valueOf() || null

  if (!contact || userId !== ownerId) {
    throw new NotFound('Not found')
  }

  let deletedContact = null
  if (isValidObjectId(contactId)) {
    deletedContact = await contactsDao.getContactByIdAndRemove(contactId)
  }

  res.status(200).json({ message: 'contact deleted', contact: deletedContact })
}
