import error from 'http-errors'
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar'
import { User } from '../../model/users.js'

const { Conflict } = error
const { genSaltSync, hashSync } = bcrypt

export const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const hashedPassword = hashSync(password, genSaltSync(10))
  const avatarURL = gravatar.url(email)

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  })

  res.status(201).json({
    message: 'success',
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  })
}
