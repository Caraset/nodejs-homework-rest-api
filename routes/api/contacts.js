import { Router } from 'express'
import ctrl from '../../controllers/contacts/index.js'

import { contactSchema } from '../../schemas/index.js'
import { validation, ctrlWrapper } from '../../middlewares/index.js'
// import { validation } from '../../middlewares/validation.js'

const router = Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.delete('/:contactId', ctrlWrapper(ctrl.remove))

router.post(
  '/',
  validation(contactSchema, { presence: 'required' }),
  ctrlWrapper(ctrl.add),
)

router.patch(
  '/:contactId',
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById),
)

export default router
