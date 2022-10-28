import { getAllUsers, getUser } from '../controllers/usersController.js'

import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', getUser)
usersRouter.get('/', getAllUsers)

export default usersRouter
