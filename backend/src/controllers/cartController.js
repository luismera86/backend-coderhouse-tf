import { request, response } from 'express'

import Cart from '../models/cartModel.js'
import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

export const createCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const findCart = await Cart.findOne({ id_user: id })
    if (!findCart) {
      const newCart = new Cart({ id_user: id })
      await newCart.save()
      console.log(newCart)
      res.status(201).json({ newCart })
      return
    }

    res.status(200).json({ findCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getCart = async (req = request, res = response) => {
  try {
    const { id } = req.body
    const cart = await Cart.findOne({ id_user: id })
    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const addProductToCart = async (req = request, res = response) => {
  try {
    const { id } = req.body
    const product = await Product.findById(id)
    const cart = await Cart.findOne({ id_user: id })
    await cart.updateOne({ $push: { products: product } })

    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProductFromCart = async (req = request, res = response) => {
  try {
    const id = req.params
    const cart = await Cart.findOne({ id_user: id })
    await cart.updateOne({ $pull: { products: { _id: id } } })

    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}
