import error from 'http-errors'
import sgMail from '@sendgrid/mail'
import userDao from '../../dao/userDao.js'

const { BadRequest, NotFound } = error

export const sendVerificationMail = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('missing required field email')
  }

  const user = await userDao.findUserByEmail({ email })

  if (!user) {
    throw new NotFound('Not found')
  }

  if (user.verify === true) {
    throw new BadRequest('Verification has already been passed')
  }
  const { verificationToken } = user
  const msg = {
    to: email,
    from: 'higherthenstars@gmail.com',
    subject: 'Registration verification',
    text: `Varify http://localhost:6969/api/users/verify/${verificationToken}`,
    html: `<a href="http://localhost:6969/api/users/verify/${verificationToken}">Verify</a>`,
  }

  sgMail.send(msg)

  res.status(200).json({ message: 'Verification email sent' })
}
