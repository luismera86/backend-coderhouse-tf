import cartSlice from '../features/cart/cartSlice'
import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/products/productsSlice'
import userSlice from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    cart: cartSlice
  },
})

// Ifnfer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
