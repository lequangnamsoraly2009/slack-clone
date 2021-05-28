import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/App/appSlice';
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
