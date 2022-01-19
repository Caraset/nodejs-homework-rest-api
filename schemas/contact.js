import Joi from 'joi'

const phoneRegexp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/

const nameSchema = Joi.string()
  .regex(/^[a-zA-Z]+ [a-zA-Z]+$/i)
  .min(3)
  .max(30)
  .insensitive()

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const phoneSchema = Joi.string().regex(phoneRegexp)

export const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

export const contactSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  favorite: Joi.bool(),
})
