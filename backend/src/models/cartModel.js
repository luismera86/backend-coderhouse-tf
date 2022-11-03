import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  id_user: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})

const Cart = model('Cart', cartSchema)

export default Cart
