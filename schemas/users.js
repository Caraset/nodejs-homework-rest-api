import Joi from 'joi'

// const phoneRegexp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/

/*
  const nameSchema = Joi.string()
  .regex(/^[a-zA-Z]+ [a-zA-Z]+$/i)
  .min(3)
  .max(30)
  .insensitive()
*/

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const passwordSchema = Joi.string().min(6).max(15).insensitive()

export const userSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
})

// const phoneSchema = Joi.string().regex(phoneRegexp)
