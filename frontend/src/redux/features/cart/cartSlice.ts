import { Cart, Product } from '@/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppDispatch } from '../../app/store'
import { db } from '@/api/db'

const initialState: Cart = {}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state = action.payload
      return action.payload
    },
  },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer

// Eliminar producto del carrito en la base de datos mediante un id

export const deleteProductFromCart = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await db.delete(`/cart/${id}`)
      dispatch(getCartFromDb())
    } catch (error) {
      console.log(error)
    }
  }
}

// Creamos un carrito nuevo con los datos del usuario

export const createCartUser = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const response = await db.post(`/cart/${id}`)
    const data = response.data
    dispatch(setCart(data))
  }
}

// Traemos el carrito de la base de datos y lo seteamos en el state de redux

export const getCartFromDb = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await db.get('/cart')
      const data = response.data
      dispatch(setCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}
