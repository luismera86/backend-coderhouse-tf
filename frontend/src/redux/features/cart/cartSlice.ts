import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product } from '@/models';

const initialState: Product[] = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            return state = [...state, action.payload]
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
           return state = state.filter((item) => item._id !== action.payload._id)
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
