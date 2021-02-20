import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerURL } from '../Config';
import CryptoJS from 'react-native-crypto-js';
import { Alert } from 'react-native';
  
axios.defaults.baseURL = ServerURL;

const initialState = {
    myInfo: null,
    cart: [],
    logInDone: false,
    registerDone: false,
    addCartDone: false,
    removeCartDone: false
}

export const logIn = createAsyncThunk(
    'user/logIn',
    async (data) => {
        try {
            // const response = await ...
            let encPassword = CryptoJS.AES.encrypt(data.password, 'test').toString();
            const response = await axios.post('user/logIn', { userID: data.userID, password: encPassword});
            console.log("TEST ", response)
            
            return response.data;
        } catch(err) {
            Alert.alert('오류', err.response.data);
        }
    }
);


export const register = createAsyncThunk(
    'user/register',
    async (data) => {
        try {
            // const response = await ...
            let encPassword = CryptoJS.AES.encrypt(data.password, 'test').toString();
            console.log("TEST"+JSON.stringify(encPassword));
            const response = await axios.post('user/register', { ...data, encPassword});
            console.log("TEST2", response)
            return response.data;
        } catch(err) {
            Alert.alert('오류', err.response.data);
        }
    }
);

export const changeCartQty = createAsyncThunk(
    'user/changeCartQty',
    async (data) => {
        try {
            // const response = await ...
            console.log('카트 ', data)
            return data;
        } catch(err) {
            return err;
        }
    }
);


export const addCart = createAsyncThunk(
    'user/addCart',
    async (data) => {
        try {
            const response = await axios.post('user/addCart', data);
            
            return response.data;
        } catch(err) {
            return err;
        }
    }
);


export const removeCart = createAsyncThunk(
    'user/removeCart',
    async (data) => {
        try {
            console.log('카트 ', data)
            const response = await axios.post('user/removeCart', data);
            
            return response.data;
        } catch(err) {
            return err;
        }
    }
);

export const removeSelectedCartItem = createAsyncThunk(
    'user/removeSelectedCartItem',
    async (data) => {
        try {
            const response = await axios.post('user/removeSelectedCartItem', data);
            
            return response.data;
        } catch(err) {
            return err;
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInSuccess(state) {
            state.logInDone = false;
        },
        registerSuccess(state) {
            state.registerDone = false;
        },
        addCartSuccess(state) {
            state.addCartDone = false;
        },
        removeCartSuccess(state) {
            state.removeCartDone = false;
        },
        toggleCheckCartItem(state, action) {
            let data = state.cart.find((item) => item.cartId === action.payload.cartId);
            data.checked = action.payload.checked;
        },
        toggleAllCheckCartItem(state, action) {
            state.cart = state.cart.map((item) => { item.checked = action.payload; return item; });
        }
    },
    extraReducers: {
        [logIn.fulfilled]: (state, action) => {
            // Add user to the state array
            state.myInfo = action.payload.myInfo;
            state.cart = action.payload.cart;
            alert(JSON.stringify(action.payload.cart))
            state.logInDone = true;
        },
        [addCart.fulfilled]: (state, action) => {
            // Add user to the state array
            state.cart = action.payload;
            state.addCartDone = true;
        },
        [register.fulfilled]: (state, action) => {
            // Add user to the state array
            if(action.payload.registerSuccess === true) {
                state.registerDone = action.payload;
            } 
            
        },
        [removeCart.fulfilled]: (state, action) => {
            // Add user to the state array
            state.cart = state.cart.filter((item) => item.cartId !== action.payload.cartId);
            
            state.removeCartDone = true;
        },
        [changeCartQty.fulfilled]: (state, action) => {
            // Add user to the state array
            let id = action.payload.id;
            let qty= action.payload.qty;
            let data = state.cart.find((item) => item.id === id);
            data.qty = qty;
        },
        [changeCartQty.fulfilled]: (state, action) => {
            // Add user to the state array
            let id = action.payload.id;
            let qty= action.payload.qty;
            let data = state.cart.find((item) => item.id === id);
            data.qty = qty;
        },
        [removeSelectedCartItem.fulfilled]: (state, action) => {
            alert(JSON.stringify(action.payload));
            return;
            state.cart = state.cart.filter(item => !item.checked);

            state.onRemoveCartDone = true;
        }
    }

});

export const { registerSuccess, addCartSuccess, removeCartSuccess, logInSuccess, toggleCheckCartItem, toggleAllCheckCartItem } = userSlice.actions;