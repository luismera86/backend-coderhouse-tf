import { getOrderById, getOrderByUserID, saveOrder } from '../controllers/purchaseOrderController.js'

import { Router } from 'express'
import { validateMongoId } from '../middlewares/validateMongoId.js'

const purchaseOrder = Router()

purchaseOrder.get('/:id', validateMongoId, getOrderById)
purchaseOrder.get('/user/:id', validateMongoId, getOrderByUserID)
purchaseOrder.post('/', validateMongoId, saveOrder)
export default purchaseOrder
