import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    myInfo: null,
    cart: [],
    onRegisterDone: false,
    onAddCartDone: false,
    onRemoveCartDone: false
}

export const logIn = createAsyncThunk(
    'user/logIn',
    async (data) => {
        try {
            // const response = await ...
            return {
                id: 1,
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
        registerDone(state) {
            state.onRegisterDone = false;
        },
        addCartDone(state) {

            state.onAddCartDone = false;
        },
        removeCartDone(state) {

            state.onRemoveCartDone = false;
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
        },
        [addCart.fulfilled]: (state, action) => {
            // Add user to the state array
            action.payload.checked = false;
            state.cart.push(action.payload);
            state.onAddCartDone = true;
        },
        [register.fulfilled]: (state, action) => {
            // Add user to the state array
            state.onRegisterDone = action.payload;
        },
        [removeCart.fulfilled]: (state, action) => {
            // Add user to the state array
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            state.onRemoveCartDone = true;
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

export const { registerDone, addCartDone, removeCartDone, toggleCheckCartItem, toggleAllCheckCartItem } = userSlice.actions;