import { request, response } from 'express'

import Cart from '../models/cartModel.js'
import Order from '../models/purchaseOrderModel.js'
import Product from '../models/productsModel.js'
import User from '../models/userModel.js'
import { isValidObjectId } from 'mongoose'
import logger from '../utils/logger.js'
import { sendMailNewOrder } from '../services/nodeMailer.js'

export const createCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const userCart = await Cart.findOne({ idUser: id })
    if (!userCart) {
      const newCart = new Cart({ idUser: id })
      await newCart.save()
      console.log(newCart)

      return res.status(201).json({ newCart })
    }

    res.status(200).json({ userCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const cart = await Cart.findOne({ idUser: id })
    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const addProductToCart = async (req = request, res = response) => {
  try {
    const { idProduct, idUser, quantity } = req.body
    const isMongoId = isValidObjectId(idUser)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const item = await Product.findById(idProduct)
    const cart = await Cart.findOne({ idUser })
    const checkProductCart = cart.products.find(product => product.idProduct === idProduct)
    const indexProductCart = cart.products.findIndex(product => product.idProduct === idProduct)
    const product = {
      idProduct,
      name: item.name,
      quantity,
      subTotal: item.price * quantity,
    }
    if (checkProductCart) {
      cart.products[indexProductCart].quantity = cart.products[indexProductCart].quantity + product.quantity
      cart.products[indexProductCart].subTotal = cart.products[indexProductCart].quantity * item.price
      await Cart.updateOne({ idUser }, { $set: { products: cart.products } })
    } else {
      await Cart.updateOne({ idUser }, { $push: { products: product } })
    }
    const initialValue = 0
    const total = await cart.products.reduce((acc, item) => acc + item.subTotal, initialValue)
    await Cart.updateOne({ idUser }, { $set: { total } })
    const newCart = await Cart.findOne({ idUser })
    res.status(200).json({ newCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProductFromCart = async (req = request, res = response) => {
  try {
    const { idProduct, idUser } = req.body
    const isMongoId = isValidObjectId(idUser)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    await Cart.updateOne({ idUser }, { $pull: { products: { idProduct } } })
    const cart = await Cart.findOne({ idUser })
    const initialValue = 0
    const total = cart.products.reduce((acc, item) => acc + item.subTotal, initialValue)
    await Cart.updateOne({ idUser }, { $set: { total } })
    const newCart = await Cart.findOne({ idUser })
    res.status(200).json({ newCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const purchaseCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const cart = await Cart.findOne({ idUser: id })
    const user = await User.findOne({ _id: id })
    if (!cart) {
      return res.status(401).json({ msg: 'No existe un carrito para ese usuario' })
    }
    if (!user) {
      return res.status(401).json({ msg: 'No existe un usuario con ese id' })
    }
    const { address, email } = user
    const { products, idUser, total } = cart
    const order = new Order({ idUser, email, address, date: new Date(), products, total })
    await order.save()
    sendMailNewOrder(order, idUser)
    res.status(200).json({ order })
  } catch (error) {
    logger.info('error', error)
    res.status(500).json({ msg: error })
  }
}
