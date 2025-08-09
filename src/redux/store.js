import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import activeReducer from './slices/currUserSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currUser: activeReducer,
  },
});