import error from 'http-errors'
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar'
import { v4 as uuidv4 } from 'uuid'
import sgMail from '@sendgrid/mail'
import userDao from '../../dao/userDao.js'

const { Conflict } = error
const { genSaltSync, hashSync } = bcrypt

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const register = async (req, res) => {
  const { email, password } = req.body
  const user = await userDao.findUserByEmail({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const hashedPassword = hashSync(password, genSaltSync(10))
  const avatarURL = gravatar.url(email)
  const verificationToken = uuidv4()
  const msg = {
    to: email,
    from: 'higherthenstars@gmail.com',
    subject: 'Registration verification',
    text: `Varify http://localhost:6969/api/users/verify/${verificationToken}`,
    html: `<a href="http://localhost:6969/api/users/verify/${verificationToken}">Verify</a>`,
  }

  const result = await userDao.createUser({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  })

  sgMail.send(msg)

  res.status(201).json({
    message: 'success',
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  })
}
