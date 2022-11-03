// Todo: Aqui creamos el modelo de orden de compra que se va a registrar en la base de datos que tenga el id del usuario, email del usuario, productos con sus cantidades y su subtotales, total a pagar.

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
  cart: {
    type: Array,
    required: true,
  },
})

const Order = model('Order', orderSchema)

export default Order
