import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    myInfo: null,
    cart: [],
    onRegisterDone: false
}

export const logIn = createAsyncThunk(
    'user/logIn',
    async (data) => {
        try {
            // const response = await ...
            return {
                email: data.email,
                name: 'TEST',
                HKPoint: 1500,
                couponCount: 4,
                rank: 'Silver'
            }
        } catch(err) {
            return err;
        }
    }
);


export const register = createAsyncThunk(
    'user/register',
    async (data) => {
        try {
            // const response = await ...
            console.log(data);
            return true;
        } catch(err) {
            return err;
        }
    }
);


export const addCart = createAsyncThunk(
    'user/addCart',
    async (data) => {
        try {
            // const response = await ...
            return {

            }
        } catch(err) {
            return err;
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [logIn.fulfilled]: (state, action) => {
            // Add user to the state array
            state.myInfo = action.payload;
        },
        [addCart.fulfilled]: (state, action) => {
            // Add user to the state array
            state.cart.push(action.payload);
        },
        [register.fulfilled]: (state, action) => {
            // Add user to the state array
            state.onRegisterDone = action.payload;
        }
    }

});