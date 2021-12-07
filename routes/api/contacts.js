import { Router } from 'express'
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../model/index.js'

const router = Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json({ message: 'success', contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await getContactById(contactId)
    res.status(200).json({ contact, message: 'success' })
  } catch ({ status, message }) {
    res.status(status).json({ message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    res.status(201).json({ message: 'success', contact })
  } catch ({ status, message }) {
    res.status(status).json({ message })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await removeContact(contactId)
    res.status(200).json({ message: 'Contact deleted', contact })
  } catch ({ status, message }) {
    res.status(status).json({ message })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await updateContact(contactId, req.body)
    res.status(200).json({ message: 'success', contact })
  } catch ({ status, message }) {
    res.status(status).json({ message })
  }
})

export default router
