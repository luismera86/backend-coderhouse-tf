import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductQuantity,
} from '../controllers/productsController.js'

import { Router } from 'express'
import { isAdminRole } from '../middlewares/validateRole.js'
import { validateJwt } from '../middlewares/validateJwt.js'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', validateJwt, isAdminRole, createProduct)
productsRouter.put('/:id', validateJwt, isAdminRole, updateProduct)
productsRouter.put('/:id_product', updateProductQuantity)
productsRouter.delete('/:id', validateJwt, isAdminRole, deleteProduct)

export default productsRouter
