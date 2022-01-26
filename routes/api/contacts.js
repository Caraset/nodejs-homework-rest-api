import { Router } from 'express'
import ctrl from '../../controllers/contacts/index.js'

import {
  contactSchema,
  contactSchemaReq,
  favoriteSchema,
} from '../../schemas/contact.js'
import { validation, ctrlWrapper, auth } from '../../middlewares/index.js'

const router = Router()

router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.delete('/:contactId', ctrlWrapper(ctrl.remove))

router.post('/', auth, validation(contactSchemaReq), ctrlWrapper(ctrl.add))

router.put(
  '/:contactId',
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavoriteById),
)

export default router
