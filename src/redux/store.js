import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit";
import designSlice from "./reducers/design/designSlice";
import gameSlice from "./reducers/game/gameSlice"



const rootReducer=combineReducers({
  designSlice,
  gameSlice
})
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });