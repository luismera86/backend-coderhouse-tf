import { Router } from 'express'
import { loginUser } from '../controllers/loginController.js'

const loginRouter = Router()
loginRouter.post('/', loginUser)

export default loginRouter
