import { Router } from 'express'
import { getOrderById, getOrderByUserID, saveOrder } from '../controllers/purchaseOrderController'

const purchaseOrder = Router()

purchaseOrder.get('/:id', getOrderById)
purchaseOrder.get('/', getOrderByUserID)
purchaseOrder.post('/', saveOrder)
export default purchaseOrder
