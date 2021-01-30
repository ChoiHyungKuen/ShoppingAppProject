import { combineReducers } from '@reduxjs/toolkit';
import { mainSlice } from './mainSlice';
import { productSlice } from './productSlice';
import { userSlice } from './userSlice';
  
export const rootReducer = combineReducers({
    main: mainSlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer // createSlice로 만든 slice 객체가 가진 reducer
});
