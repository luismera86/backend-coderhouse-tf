import { addProductToCart, createCart, deleteProductFromCart, getCart, purchaseCart } from '../controllers/cartController.js'

import { Router } from 'express'

const cartRouter = Router()

cartRouter.get('/:id', getCart)
cartRouter.post('/', addProductToCart)
cartRouter.post('/:id', createCart)
cartRouter.post('/purchase/:id', purchaseCart)
cartRouter.delete('/', deleteProductFromCart)

export default cartRouter
