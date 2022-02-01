import Joi from 'joi'

export const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const passwordSchema = Joi.string().min(6).max(15).insensitive()

export const emailSchema = Joi.object({
  email: email,
})

export const userSchema = Joi.object({
  email: email.required(),
  password: passwordSchema.required(),
})
