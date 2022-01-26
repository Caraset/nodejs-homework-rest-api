import { User } from '../../model/users.js'

export const logout = async (req, res) => {
  const { id } = req.user

  await User.findByIdAndUpdate(id, { token: null })

  res.status(204).json()
}
