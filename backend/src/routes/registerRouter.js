import { Router } from 'express'
import { userRegister } from '../controllers/registerController.js'

const registerRouter = Router()

registerRouter.post('/', userRegister)

export default registerRouter
