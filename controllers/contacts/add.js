import contactsDao from '../../dao/contactsDao.js'

export const add = async (req, res) => {
  const { id } = req.user

  const contact = await contactsDao.addContact({ ...req.body, owner: id })

  res.status(201).json({ message: 'success', contact })
}
