import error from 'http-errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userDao from '../../dao/userDao.js'

const { Unauthorized, Forbidden } = error
const { compareSync } = bcrypt

const { SECRET_KEY } = process.env

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await userDao.findUserByEmail({ email })

  if (!user || !compareSync(password, user.password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  if (user.verify === false) {
    throw new Forbidden('Not verified')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

  user.token = token
  await userDao.findUserByIdAndUpdate(user._id, { token })

  res.status(200).json({
    message: 'success',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}
