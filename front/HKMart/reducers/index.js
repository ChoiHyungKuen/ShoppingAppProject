import { combineReducers } from '@reduxjs/toolkit';
import { productsSlice } from './productsSlice';
  
export const rootReducer = combineReducers({
    products: productsSlice.reducer // createSlice로 만든 slice 객체가 가진 reducer
});
