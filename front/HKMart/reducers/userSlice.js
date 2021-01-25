import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    myInfo: null
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [logIn.fulfilled]: (state, action) => {
            // Add user to the state array
            state.myInfo = action.payload;
        }
    }

});