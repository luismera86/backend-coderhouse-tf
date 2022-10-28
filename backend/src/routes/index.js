import { Router } from 'express'
import cartRouter from './cartRouter.js'
import loginRouter from './loginRouter.js'
import productsRouter from './productsRouter.js'
import registerRouter from './registerRouter.js'
import usersRouter from './usersRoutes.js'

const routes = Router()
routes.use('/user', usersRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)
routes.use('/products', productsRouter)
routes.use('/cart', cartRouter)

export default routes
