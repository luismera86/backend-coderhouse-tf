import Cart from '../models/cartModel.js'

export const clearCart = async idUser => {
  try {
    await Cart.updateOne({ idUser }, { $set: { products: [] } })
  } catch (error) {
    console.log(error)
  }
}
