import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/usersController.js'

import { Router } from 'express'
import { isAdminRole } from '../middlewares/validateRole.js'
import { validateJwt } from '../middlewares/validateJwt.js'

const usersRouter = Router()

usersRouter.get('/:id', getUser)
usersRouter.get('/', getAllUsers)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', validateJwt, isAdminRole, deleteUser)

export default usersRouter
