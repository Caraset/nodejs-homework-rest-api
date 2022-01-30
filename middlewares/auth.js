import error from 'http-errors'
import jwt from 'jsonwebtoken'
import userDao from '../dao/userDao.js'

const { Unauthorized } = error
const { verify } = jwt
const { SECRET_KEY } = process.env

export const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }

    const { id } = verify(token, SECRET_KEY)
    const user = await userDao.findUserById(id)

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized')
    }

    req.user = user
    next()
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401
    }

    next(error)
  }
}
