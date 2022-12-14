import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  idUser: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ['generated', 'cancelled'],
    default: 'generated',
  },
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true
  }
})

const Order = model('Order', orderSchema)

export default Order
