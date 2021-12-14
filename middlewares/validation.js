export const validation = (schema, options) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, options)
      next()
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}
