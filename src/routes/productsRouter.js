import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductCategory,
  getProducts,
  updateProduct,
  updateProductQuantity,
} from '../controllers/productsController.js'

import { Router } from 'express'
import { isAdminRole } from '../middlewares/validateRole.js'
import { validateJwt } from '../middlewares/validateJwt.js'
import { validateMongoId } from '../middlewares/validateMongoId.js'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', validateMongoId, getProductById)
productsRouter.get('/category/:category', getProductCategory)
productsRouter.post('/', validateJwt, isAdminRole, createProduct)
productsRouter.put('/:id', validateJwt, validateMongoId, isAdminRole, updateProduct)
productsRouter.put('/:id_product', validateMongoId, updateProductQuantity)
productsRouter.delete('/:id', validateMongoId, validateJwt, isAdminRole, deleteProduct)

export default productsRouter
