import { getOrderById, getOrderByUserID, saveOrder } from '../controllers/purchaseOrderController.js'

import { Router } from 'express'

const purchaseOrder = Router()

purchaseOrder.get('/:id', getOrderById)
purchaseOrder.get('/', getOrderByUserID)
purchaseOrder.post('/', saveOrder)
export default purchaseOrder
