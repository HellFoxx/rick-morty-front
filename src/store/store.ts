import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';

const persistedReducer = persistReducer(
  { key: 'root', storage },
  combineReducers({
    user: userReducer
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
