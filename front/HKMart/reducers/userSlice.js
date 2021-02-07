import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerURL } from '../Config';
import CryptoJS from 'react-native-crypto-js';
  
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
            console.log("TEST"+JSON.stringify(encPassword));
            const response = await axios.post('user/logIn', { email: data.email, encPassword});
            console.log("TEST2", response)
            return response.data;
        } catch(err) {
            alert(err.message);
            return err;
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
            alert(err.message);
            return err;
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
            // const response = await ...
            console.log('카트 ', data)
            return data;
        } catch(err) {
            return err;
        }
    }
);


export const removeCart = createAsyncThunk(
    'user/removeCart',
    async (data) => {
        try {
            // const response = await ...
            console.log('카트 ', data)
            //나중에는 삭제된 데이터의 id가 옴
            return data;
        } catch(err) {
            return err;
        }
    }
);

export const removeSelectedCartItem = createAsyncThunk(
    'user/removeSelectedCartItem',
    async (data) => {
        try {
            // const response = await ...
            console.log('카트 ', data)
            //나중에는 삭제된 데이터의 id가 옴
            return { 'state': 'success'};
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
            let data = state.cart.find((item) => item.id === action.payload.id);
            data.checked = action.payload.checked;
        },
        toggleAllCheckCartItem(state, action) {
            state.cart = state.cart.map((item) => { item.checked = action.payload; return item; });
        }
    },
    extraReducers: {
        [logIn.fulfilled]: (state, action) => {
            // Add user to the state array
            state.myInfo = action.payload;
            state.logInDone = true;
        },
        [addCart.fulfilled]: (state, action) => {
            // Add user to the state array
            action.payload.checked = false;
            state.cart.push(action.payload);
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
            state.cart = state.cart.filter((item) => item.id !== action.payload);
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
            state.cart = state.cart.filter(item => !item.checked);
            state.onRemoveCartDone = true;
        }
    }

});

export const { registerSuccess, addCartSuccess, removeCartSuccess, logInSuccess, toggleCheckCartItem, toggleAllCheckCartItem } = userSlice.actions;