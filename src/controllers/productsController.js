import { request, response } from 'express'

import Product from '../models/productsModel.js'
import { isValidObjectId } from 'mongoose'
import logger from '../utils/logger.js'

export const getProducts = async (req = request, res = response) => {
  try {
    const products = await Product.find()
    if (products.length === 0) {
      return res.status(200).json({ msg: 'No hay productos para mostrar' })
    }
    res.status(200).json({ products })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getProductById = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const product = await Product.findOne({ _id: id })

    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getProductCategory = async (req = request, res = response) => {
  try {
    const { category } = req.params

    const products = await Product.find({ category })

    if (products.length === 0) {
      return res.status(400).json({ msg: 'No existe la categoría' })
    }
    res.status(200).json({ products })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const createProduct = async (req = request, res = response) => {
  try {
    const { name, price, description, thumbnail, category, quantity } = req.body
    const product = new Product({
      name,
      price,
      description,
      thumbnail,
      category,
      quantity,
    })
    await product.save()
    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const updateProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const { name, price, description, thumbnail, category, quantity } = req.body
    const product = await Product.findById({ _id: id })
    await product.update({ name, price, description, thumbnail, category, quantity })
    res.status(200).json({ msg: 'Producto modificado con éxito', product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const updateProductQuantity = async (req = request, res = response) => {
  try {
    const { idProduct } = req.params
    const { quantity } = req.body
    const isMongoId = isValidObjectId(idProduct)
    console.log(isMongoId)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const product = await Product.findByIdAndUpdate({ _id: idProduct }, { quantity })
    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    console.log(isMongoId)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const product = await Product.findOne({ _id: id })
    await product.remove()
    res.status(200).json({ msg: 'Producto eliminado con éxito' })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}
