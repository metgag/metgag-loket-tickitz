import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { PERSIST, persistReducer, REHYDRATE } from "redux-persist";

import authReducer from './slices/authSlice';
import activeReducer from './slices/currUserSlice'
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: authReducer,
    currUser: activeReducer,
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
