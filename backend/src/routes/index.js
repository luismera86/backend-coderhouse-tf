import { Router } from 'express'
import cartRouter from './cartRouter.js'
import loginRouter from './loginRouter.js'
import messageRouter from './messageRouter.js'
import productsRouter from './productsRouter.js'
import purchaseOrder from './purchaseOrderRouter.js'
import registerRouter from './registerRouter.js'
import usersRouter from './usersRoutes.js'

const routes = Router()
routes.use('/user', usersRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)
routes.use('/products', productsRouter)
routes.use('/cart', cartRouter)
routes.use('/purchase', purchaseOrder)
routes.use('/chat', messageRouter)

export default routes
