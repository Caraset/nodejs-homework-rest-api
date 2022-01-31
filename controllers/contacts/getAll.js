import contactsDao from '../../dao/contactsDao.js'

export const getAll = async (req, res) => {
  const { id } = req.user
  const { page = 1, limit = 5, favorite = null } = req.query
  const skip = (page - 1) * limit

  const contacts = await contactsDao.getAllContacts(
    {
      owner: id,
      ...(favorite === 'false' || favorite === 'true' ? { favorite } : {}),
    },
    '',
    {
      skip,
      limit: Number(limit),
    },
  )
  res.status(200).json({ message: 'success', contacts })
}
