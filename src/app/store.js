import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/api/apiSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer 
  }
});

export default store;