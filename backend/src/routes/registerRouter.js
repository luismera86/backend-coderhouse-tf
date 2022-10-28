import { registerFail, userRegister } from '../controllers/registerController.js'

import { Router } from 'express'
import passport from 'passport'
import { upload } from '../middlewares/uploadFiles.js'

const registerRouter = Router()

registerRouter.get('/registerfail', registerFail)
registerRouter.post(
  '/',
  upload.single('avatar'),
  passport.authenticate(
    'register',
    {
      failureRedirect: '/register/registerfail',
    },
    userRegister
  )
)

export default registerRouter
