/* eslint-disable camelcase */

import { request, response } from 'express'

import Cart from '../models/cartModel.js'
import Order from '../models/purchaseOrderModel.js'
import Product from '../models/productsModel.js'
import User from '../models/userModel.js'
import { isValidObjectId } from 'mongoose'
import logger from '../utils/logger.js'

export const createCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const userCart = await Cart.findOne({ id_user: id })
    if (!userCart) {
      const newCart = new Cart({ id_user: id })
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
    const { id_product, id_user, quantity } = req.body
    const item = await Product.findById(id_product)

    const product = {
      id_product,
      name: item.name,
      quantity,
      subTotal: item.price * quantity,
    }
    await Cart.updateOne({ id_user }, { $push: { products: product } })
    const cart = await Cart.findOne({ id_user })
    const initialValue = 0
    const total = await cart.products.reduce((acc, item) => acc + item.subTotal, initialValue)
    await Cart.updateOne({ id_user }, { $set: { total } })
    const newCart = await Cart.findOne({ id_user })
    res.status(200).json({ newCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProductFromCart = async (req = request, res = response) => {
  try {
    // Todo: seguir los pasos del addProductToCart para el proceso de eliminación de producto y calcula de total
    const { id_product, id_user } = req.body
    const cart = await Cart.findOne({ id_user })
    await cart.updateOne({ $set: { total: 0 } })
    await cart.updateOne({ $pull: { products: { id_product } } })
    // const cartUpdate = await Cart.findOne({ id_user })
    // const initialValue = 0
    // const total = cart.products.reduce((acc, item) => acc + item.subTotal, initialValue)
    // await cartUpdate.updateOne({ total })

    res.status(200).json({ cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

// Todo agregar un controller para verificar si el producto ya está en el carrito y solamente aumentar la cantidad que se selecciono y no sume productos repetidos, tmb verificar que la cantidad no pueda ser menor a 1

export const purchaseCart = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const cart = await Cart.findOne({ id_user: id })
    const user = await User.findOne({ _id: id })
    if (!cart) {
      return res.status(401).json({ msg: 'No existe un carrito para ese usuario' })
    }
    if (!user) {
      return res.status(401).json({ msg: 'No existe un usuario con ese id' })
    }
    const { address, email } = user
    const { products, id_user } = cart
    const order = new Order({ id_user, email, address, date: new Date(), products })
    await order.save()
  } catch (error) {
    logger.info('error', error)
    res.status(500).json({ msg: error })
  }
}
