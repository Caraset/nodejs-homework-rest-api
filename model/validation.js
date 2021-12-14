import Joi from 'joi'

const nameSchema = Joi.string()
  .regex(/^[a-zA-Z]+ [a-zA-Z]+$/i)
  .min(3)
  .max(30)
  .insensitive()

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const phoneSchema = Joi.string().regex(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)

const contactSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
})

const contactSchemaNotReq = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
})

const postContactValidation = async (req, res, next) => {
  try {
    await contactSchema.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const patchContactValidation = async (req, res, next) => {
  try {
    await contactSchemaNotReq.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

export { postContactValidation, patchContactValidation }
