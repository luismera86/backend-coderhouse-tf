/* eslint-disable camelcase */

import { request, response } from 'express'

import Order from '../models/purchaseOrderModel.js'
import logger from '../utils/logger.js'

export const saveOrder = async (req = request, res = response) => {
  try {
    const { user_id, mail, cart } = req.body
    const order = new Order({ user_id, mail, cart })
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
    if (!order) {
      return res.status(401).json({ msg: 'No se encuentra la orden solicitada' })
    }

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getOrderByUserID = async (res = request, req = request) => {
  try {
    const { id } = req.body
    const order = await Order.find({ user_id: id })
    if (!order) {
      return res.status(401).json({ msg: 'No se encuentra la orden solicitada' })
    }

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
