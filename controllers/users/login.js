import error from 'http-errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../model/users.js'

const { Unauthorized } = error
const { compareSync } = bcrypt

const { SECRET_KEY } = process.env

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !compareSync(password, user.password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

  await User.findByIdAndUpdate(user._id, { token })

  res.status(200).json({
    message: 'success',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}
