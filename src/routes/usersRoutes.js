import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/usersController.js'

import { Router } from 'express'
import { isAdminRole } from '../middlewares/validateRole.js'
import { validateJwt } from '../middlewares/validateJwt.js'
import { validateMongoId } from '../middlewares/validateMongoId.js'

const usersRouter = Router()

usersRouter.get('/:id', validateMongoId, validateJwt, getUser)
usersRouter.get('/', getAllUsers)
usersRouter.put('/:id', validateMongoId, validateJwt, updateUser)
usersRouter.delete('/:id', validateMongoId, validateJwt, isAdminRole, deleteUser)

export default usersRouter
