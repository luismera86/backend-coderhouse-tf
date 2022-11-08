import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  },
  total: {
    type: Number,
  },
})

const Cart = model('Cart', cartSchema)

export default Cart
