import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    eventImagePath: [],
    adImagePath: '',
}

export const loadEventImages = createAsyncThunk(
    'main/loadEventImage',
    async (data) => {
        try {
            // const response = await ...
            return [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree" // Network image
            ]
        } catch(err) {
            return err;
        }
    }
);

export const loadADImage= createAsyncThunk(
    'main/loadADImage',
    async (data) => {
        try {
            // const response = await ...
            return 'https://source.unsplash.com/1024x768/?ad';
        } catch(err) {
            return err;
        }
    }
);

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    extraReducers: {
        [loadEventImages.fulfilled]: (state, action) => {
            state.eventImagePath = action.payload;
        },
        [loadADImage.fulfilled]: (state, action) => {
            state.adImagePath = action.payload;
        },
    }

});