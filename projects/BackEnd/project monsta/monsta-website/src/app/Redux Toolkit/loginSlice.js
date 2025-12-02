"use client";
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import { useState } from 'react';

var userData = Cookies.get("user");
const parsedUser = userData ? JSON.parse(userData) : null;

const initialState = {
  user: parsedUser ?? '',
  token: Cookies.get("token") ?? '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userDetails: (state, { payload }) => {
      state.user = payload.user
      Cookies.set("user", JSON.stringify(payload.user));

      state.token = payload.token
      Cookies.set("token", payload.token);
    },
    logOut: (state) => {
      state.user = ''
      Cookies.remove('user');
      state.token = ''
      Cookies.remove('token');
    },

  },
})

// Action creators are generated for each case reducer function
export const { userDetails, logOut } = loginSlice.actions

export default loginSlice.reducer