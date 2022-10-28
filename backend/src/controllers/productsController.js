import { request, response } from 'express'

import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

export const getProducts = async (req = request, res = response) => {
  try {
    const products = await Product.find()
    res.json({ products })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getProductById = async (req = request, res = response) => {
  try {
    const { id } = req.body
    const product = await Product.findById({ _id: id })
    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const createProduct = async (req = request, res = response) => {
  try {
    const { name, price, description, thumbnail } = req.body
    const product = new Product({
      name,
      price,
      description,
      thumbnail,
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
    const { id } = req.body
    const { name, price, description, thumbnail } = req.body
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { name, price, description, thumbnail },
      { new: true }
    )
    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.body
    const product = await Product.findByIdAndDelete({ _id: id })
    res.status(200).json({ product })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}
