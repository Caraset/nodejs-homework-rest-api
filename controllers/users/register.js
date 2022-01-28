import error from 'http-errors'
import bcrypt from 'bcryptjs'
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

  const result = await User.create({ email, password: hashedPassword })

  res.status(201).json({
    message: 'success',
    user: { email: result.email, subsctiption: result.subsctiption },
  })
}
