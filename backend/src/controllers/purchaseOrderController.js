/* eslint-disable camelcase */

import { request, response } from 'express'

import Order from '../models/purchaseOrderModel.js'
import { isValidObjectId } from 'mongoose'
import logger from '../utils/logger.js'

export const saveOrder = async (req = request, res = response) => {
  try {
    const { user_id, mail, cart } = req.body
    const isMongoId = isValidObjectId(user_id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
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
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const order = await Order.findById({ _id: id })

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getOrderByUserID = async (res = request, req = request) => {
  try {
    const { id } = req.body
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const order = await Order.find({ user_id: id })

    res.status(200).json({ order })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
