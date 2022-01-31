/* eslint-disable */
import { jest } from '@jest/globals'
import jwt from 'jsonwebtoken'
import ctrl from '../controllers/users/index.js'
import userDao from '../dao/userDao.js'
import 'dotenv/config'
jest.useFakeTimers()

const { login } = ctrl
const { SECRET_KEY } = process.env

describe('test login function', () => {
  const user = {
    _id: 1654,
    password: '$2a$10$umYyubR3cLLmPcrgz3CjBeVnILBApFFXLUUW3KS49M7HAZpO.hzU2',
    email: 'test@gmail.com',
    subscription: 'starter',
    token: null,
    avatarURL: '//www.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058',
  }

  const mReq = { body: { email: 'test@gmail.com', password: '123456' } }
  const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

  beforeEach(() => {
    jest.spyOn(userDao, 'findUserByEmail').mockResolvedValueOnce(user)
    jest.spyOn(userDao, 'findUserByIdAndUpdate').mockResolvedValueOnce()
  })

  it('return status 200', async () => {
    await login(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(200)
  })

  it('respons must return token', async () => {
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' })

    await login(mReq, mRes)

    const res = mRes.json.mock.calls[0][0]

    expect(res.token).toBe(token)
  })

  it('respons return object with values: email, subscriptions', async () => {
    await login(mReq, mRes)

    const res = mRes.json.mock.calls[0][0]

    expect(res.user.email).toBe(user.email)
    expect(res.user.subscription).toBe(user.subscription)
    expect(typeof res.user.email).toBe('string')
    expect(typeof res.user.subscription).toBe('string')
  })
})
