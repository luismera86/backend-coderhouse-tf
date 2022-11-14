import { request, response } from 'express'

import Order from '../models/purchaseOrderModel.js'
import logger from '../services/logger.js'

export const saveOrder = async (req = request, res = response) => {
  try {
    const { idUser, mail, cart } = req.body
    const order = new Order({ idUser, mail, cart })
    await order.save()
    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getOrderById = async (res = request, req = request) => {
  try {
    const { id } = req.params
    const order = await Order.findById({ _id: id })

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getOrderByUserID = async (res = request, req = request) => {
  try {
    const { id } = req.params
    const order = await Order.find({ idUser: id })

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
