import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { PERSIST, persistReducer, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import movieReducer from './slices/movieSlice';
import personalReducer from "./slices/personalSlice";
import tokenReducer from './slices/tokenSlice.js';
import cinemaReducer from './slices/cinemaSlice.js';
import orderReducer from './slices/orderSlice.js';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: tokenReducer,
    tmdb: movieReducer,
    cinema: cinemaReducer,
    order: orderReducer,
    userInfo: personalReducer,
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
