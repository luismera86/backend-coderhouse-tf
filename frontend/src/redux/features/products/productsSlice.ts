import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppDispatch } from '@/redux/app';
import { Product } from '@/models';
import { db } from '@/api/db';

const initialState: Product[] = [];

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            return action.payload;
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
});

export const { setProducts, addProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;

// Thunks

export const getProducts = () => async (dispatch: AppDispatch) => {
    const response = await db.get('/products');
    dispatch(setProducts(response.data.products));
}