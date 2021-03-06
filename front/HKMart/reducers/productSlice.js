import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerURL } from '../Config';

axios.defaults.baseURL = ServerURL;

const initialState = {
    searchedProducts: [],
    product: null,
    imagePaths: [],
    onSearchDone: false
}
export const searchProducts = createAsyncThunk(
    'product/searchProducts',
    async (data) => {
        try {
            // const response = await ...
            const response = await axios.post('product/search', data);
            return response.data;
        } catch(err) {
            return err;
        }
    }
);

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (data) => {
        try {
            // const response = await ...
            const response = await axios.get(`product/${data}`);
            console.log("TEST2", response)
            return response.data;
        } catch(err) {
            alert(err.message);
            return err;
        }
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        searchDone(state) {
            state.onSearchDone = false;
        }
    },
    extraReducers: {
        [searchProducts.fulfilled]: (state, action) => {
            // Add user to the state array
            state.searchedProducts = action.payload;
            state.onSearchDone = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            // Add user to the state array
            state.product = action.payload;
        },

    }

});
export const { searchDone } = productSlice.actions;