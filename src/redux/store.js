import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { PERSIST, persistReducer, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import movieReducer from './slices/movieSlice';
import detailReducer from './slices/detailSlice.js';
import personalReducer from "./slices/personalSlice";
import historyReducer from './slices/historySlice';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    users: authReducer,
    whoami: loginReducer,
    tmdb: movieReducer,
    currDetail: detailReducer,
    userInfo: personalReducer,
    histories: historyReducer,
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
