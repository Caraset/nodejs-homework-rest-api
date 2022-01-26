import { Router } from 'express'
import ctrl from '../../controllers/users/index.js'

import { validation, ctrlWrapper, auth } from '../../middlewares/index.js'
import { userSchema } from '../../schemas/users.js'

const router = Router()

router.post('/signup', validation(userSchema), ctrlWrapper(ctrl.register))
router.post('/login', validation(userSchema), ctrlWrapper(ctrl.login))
router.get('/logout', auth, ctrlWrapper(ctrl.logout))

export default router
