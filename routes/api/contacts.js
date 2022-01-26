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

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById))

router.delete('/:contactId', auth, ctrlWrapper(ctrl.remove))

router.post('/', auth, validation(contactSchemaReq), ctrlWrapper(ctrl.add))

router.put(
  '/:contactId',
  auth,
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  auth,
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavoriteById),
)

export default router
