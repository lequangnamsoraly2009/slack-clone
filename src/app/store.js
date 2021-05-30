import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/App/appSlice';
import userReducer from '../features/User/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});
