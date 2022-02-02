import { Router } from 'express'
import multer from 'multer'
import ctrl from '../../controllers/users/index.js'
import path from 'path'

import { validation, ctrlWrapper, auth } from '../../middlewares/index.js'
import { userSchema, emailSchema } from '../../schemas/users.js'

const router = Router()

const uploadDir = path.resolve('./tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const upload = multer({
  storage: storage,
})

router.post('/signup', validation(userSchema), ctrlWrapper(ctrl.register))
router.post('/login', validation(userSchema), ctrlWrapper(ctrl.login))
router.get('/logout', auth, ctrlWrapper(ctrl.logout))
router.get('/current', auth, ctrlWrapper(ctrl.current))
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))
router.post(
  '/verify',
  validation(emailSchema),
  ctrlWrapper(ctrl.sendVerificationMail),
)
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
)
router.patch('/', auth, ctrlWrapper(ctrl.updateSubscription))

export default router
