import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { PERSIST, persistReducer, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import authReducer from "./slices/authSlice.js";
import orderReducer from './slices/orderSlice.js';
import userReducer from './slices/userSlice.js';
// import scheduleReducer from './slices/scheduleSlice.js';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: authReducer,
    info: userReducer,
    order: orderReducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [REHYDRATE, PERSIST],
      },
    });
  }
});

export const persistedStore = persistStore(store);

export default store;
