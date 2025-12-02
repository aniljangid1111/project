"use client";
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import searchReducer from './searchSlice'
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    search: searchReducer,
    cart: cartReducer,
  },
})