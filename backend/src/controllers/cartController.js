import { request, response } from 'express'

import Cart from '../models/cartModel.js'
import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

// import { sendNewOrder, sendWhatsApp } from '../services/twilio.js'

export const getCart = async (req = request, res = response) => {
  try {
    const user = req.user // user is added by the auth middleware
    // Verificamos si el usuarios tiene un carrito o si no tiene uno creamos uno nuevo
    const cheExistCart = await Cart.findOne({ mail: user.email })
    if (!cheExistCart) {
      const cart = new Cart({
        id_user: user._id,
        products: [],
      })
      cart.save()
      res.status(200).json({ cart })
    }
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const addProductToCart = async (req = request, res = response) => {
  try {
    const user = req.user
    const { id } = req.body
    const product = await Product.findById(id)
    const cart = await Cart.findOne({ id_user: user._id })
    await cart.updateOne({ $push: { products: product } })

    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProductFromCart = async (req = request, res = response) => {
  try {
    const user = req.user
    const { id } = req.body
    const cart = await Cart.findOne({ id_user: user._id })
    await cart.updateOne({ $pull: { products: { _id: id } } })

    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

// export const buyCart = async (req = request, res = response) => {
//   try {
//     console.log('buyCart')
//     const user = req.user
//     const cart = await Cart.findOne({ mail: user.email })
//     const order = cart.products
//     await sendNewOrder(order, user)
//     await sendWhatsApp(order, user)
//     await cart.updateOne({ $set: { products: [] } })
//     res.render('cart', { cart })
//   } catch (error) {
//     logger.info('error', error)
//     res.status(404).json({ message: error.message })
//   }
// }
