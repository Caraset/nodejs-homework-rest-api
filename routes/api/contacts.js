import { Router } from 'express'
import {
  postContactValidation,
  patchContactValidation,
} from '../../model/validation.js'

import ctrl from '../../controllers/contacts/index.js'

const router = Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.delete('/:contactId', ctrl.remove)

router.post('/', postContactValidation, ctrl.add)

router.patch('/:contactId', patchContactValidation, ctrl.update)

export default router
