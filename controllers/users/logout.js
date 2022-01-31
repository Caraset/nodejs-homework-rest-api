import userDao from '../../dao/userDao.js'

export const logout = async (req, res) => {
  const { id } = req.user

  await userDao.findUserByIdAndUpdate(id, { token: null })

  res.status(204).json()
}
