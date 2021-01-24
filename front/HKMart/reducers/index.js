import { combineReducers } from '@reduxjs/toolkit';
import { mainSlice } from './mainSlice';
import { productsSlice } from './productsSlice';
import { userSlice } from './userSlice';
  
export const rootReducer = combineReducers({
    main: mainSlice.reducer,
    user: userSlice.reducer,
    products: productsSlice.reducer // createSlice로 만든 slice 객체가 가진 reducer
});
