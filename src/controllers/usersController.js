import { request, response } from 'express'

import User from '../models/userModel.js'
import { isValidObjectId } from 'mongoose'
import logger from '../utils/logger.js'

export const getUser = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const user = await User.findOne({ _id: id })
    res.status(200).json({ user })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getAllUsers = async (req = request, res = response) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const updateUser = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const { firstName, lastName, age, email, address, avatar, phone } = req.body

    const user = await User.updateOne({ _id: id }, { firstName, lastName, age, email, address, avatar, phone })
    res.status(200).json({ msg: 'Usuario modificado con éxito', user })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }
    const user = await User.findOne({ _id: id })
    await user.remove()
    res.status(200).json({ msg: 'Usuario eliminado con éxito' })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
