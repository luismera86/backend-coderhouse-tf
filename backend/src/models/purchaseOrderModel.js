import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  id_user: {
    type: Number,
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
})

const Order = model('Order', orderSchema)

export default Order
