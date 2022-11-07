import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  mail: {
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
  cart: {
    type: Array,
    required: true,
  },
})

const Order = model('Order', orderSchema)

export default Order
