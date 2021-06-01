import {createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState:[],
  reducers: {
    getUser : (state,action) => {
      
    }
  },
});

export const {addUser, getUser } = userSlice.actions;

export default userSlice.reducer;