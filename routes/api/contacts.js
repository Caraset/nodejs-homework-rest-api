import { Router } from 'express'
import ctrl from '../../controllers/contacts/index.js'

import { joiSchema, favoriteSchema } from '../../models/contacts.js'
import { validation, ctrlWrapper } from '../../middlewares/index.js'

const router = Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.delete('/:contactId', ctrlWrapper(ctrl.remove))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add))

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:contactId/favorite',
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavoriteById),
)

export default router
