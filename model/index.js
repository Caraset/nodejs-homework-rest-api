import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { contactSchema, contactSchemaNotReq } from './validation.js'

class ContactsError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const contactsPath = resolve('./model/contacts.json')

const listContacts = async () => {
  const contacts = await readFile(contactsPath, 'utf-8')
  return JSON.parse(contacts)
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === Number(contactId))

  if (contact) {
    return contact
  } else {
    throw new ContactsError(404, 'Not found')
  }
}

const removeContact = async contactId => {
  const contacts = await listContacts()

  const contact = contacts.find(contact => contact.id === Number(contactId))

  if (!contact) {
    throw new ContactsError(404, 'Not found')
  }

  const updContacts = contacts.filter(
    contact => contact.id !== Number(contactId),
  )

  writeFile(contactsPath, JSON.stringify(updContacts))
  return contact
}

const addContact = async body => {
  try {
    await contactSchema.validateAsync(body)
  } catch ({ message }) {
    throw new ContactsError(400, message)
  }

  const contacts = await listContacts()

  for (let i = 0; i < contacts.length + 1; i++) {
    if (contacts[i]?.id !== i + 1) {
      const contact = { id: i + 1, ...body }

      const updContacts = [...contacts, contact].sort((a, b) => a.id - b.id)
      writeFile(contactsPath, JSON.stringify(updContacts))
      return contact
    }
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()

  if (!contacts.find(c => c.id === Number(contactId))) {
    throw new ContactsError(404, 'Not found')
  }

  if (Object.keys(body).length === 0) {
    throw new ContactsError(400, 'Missing fields')
  }

  try {
    await contactSchemaNotReq.validateAsync(body)
  } catch ({ message }) {
    throw new ContactsError(400, message)
  }

  const contact = {
    ...contacts.find(c => c.id === Number(contactId)),
    ...body,
  }

  const updContacts = contacts.map(c => {
    return c.id === Number(contactId) ? contact : c
  })

  writeFile(contactsPath, JSON.stringify(updContacts))
  return contact
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
