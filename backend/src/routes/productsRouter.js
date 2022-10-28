import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productsController.js'

import { Router } from 'express'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.post('/', createProduct)
productsRouter.put('/', updateProduct)
productsRouter.delete('/', deleteProduct)

export default productsRouter
