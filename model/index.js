import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

const contactsPath = resolve('./model/contacts.json')

const listContacts = async () => {
  const contacts = await readFile(contactsPath, 'utf-8')
  return JSON.parse(contacts)
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  return contacts.find(contact => contact.id === contactId)
}

const removeContact = async contactId => {
  const contacts = await listContacts()

  const contact = contacts.find(contact => contact.id === contactId)

  if (!contact) {
    return contact
  }

  const updContacts = contacts.filter(contact => contact.id !== contactId)

  writeFile(contactsPath, JSON.stringify(updContacts))
  return contact
}

const addContact = async body => {
  const contacts = await listContacts()

  for (let i = 0; i < contacts.length + 1; i++) {
    if (contacts[i]?.id !== String(i + 1)) {
      const contact = { id: String(i + 1), ...body }

      const updContacts = [...contacts, contact].sort((a, b) => a.id - b.id)
      writeFile(contactsPath, JSON.stringify(updContacts))
      return contact
    }
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const oldContact = contacts.find(c => c.id === contactId)

  if (!oldContact) {
    return 1
  }

  const contact = {
    ...oldContact,
    ...body,
  }

  const updContacts = contacts.map(c => {
    return c.id === contactId ? contact : c
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
