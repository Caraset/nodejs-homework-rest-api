import { Router } from 'express'
import ctrl from '../../controllers/users/index.js'

import { validation, ctrlWrapper } from '../../middlewares/index.js'
import { userSchema } from '../../schemas/users.js'

const router = Router()

router.post('/signup', validation(userSchema), ctrlWrapper(ctrl.register))

export default router
