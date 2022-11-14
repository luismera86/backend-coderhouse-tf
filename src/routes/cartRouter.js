import { addProductToCart, createCart, deleteProductFromCart, getCart, purchaseCart } from '../controllers/cartController.js'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validateJwt.js'
import { validateMongoId } from '../middlewares/validateMongoId.js'

const cartRouter = Router()

cartRouter.get('/:id', validateMongoId, getCart)
cartRouter.post('/', validateMongoId, addProductToCart)
cartRouter.post('/:id', validateMongoId, createCart)
cartRouter.post('/purchase/:id', validateJwt, validateMongoId, purchaseCart)
cartRouter.delete('/', validateMongoId, deleteProductFromCart)

export default cartRouter
