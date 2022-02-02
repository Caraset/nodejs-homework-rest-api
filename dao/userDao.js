import { User } from '../model/users.js'

const findUserById = async id => User.findById(id)

const findUserByEmail = async email => User.findOne(email)

const findUserByVerificationToken = async verificationToken =>
  User.findOne(verificationToken)

const findUserByIdAndUpdate = async (id, payload, options = {}) =>
  User.findByIdAndUpdate(id, payload, { ...options })

const createUser = async user => User.create(user)

export default {
  findUserById,
  findUserByEmail,
  findUserByIdAndUpdate,
  createUser,
  findUserByVerificationToken,
}
