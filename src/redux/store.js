import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { PERSIST, persistReducer, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import authReducer from './slices/authSlice';
// import activeReducer from './slices/currUserSlice';
import movieReducer from './slices/movieSlice';
import detailReducer from './slices/detailSlice';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: authReducer,
    // currUser: activeReducer,
    movies: movieReducer,
    detail: detailReducer,
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
