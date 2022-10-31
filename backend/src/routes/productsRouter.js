import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productsController.js'

import { Router } from 'express'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', createProduct)
productsRouter.put('/', updateProduct)
productsRouter.delete('/', deleteProduct)

export default productsRouter
