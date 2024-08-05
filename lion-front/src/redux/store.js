// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import sentimentReducer from './reducers/sentimentSlice';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    rootReducer,
    sentiment: sentimentReducer,
    auth: authReducer,
  },
});

export default store;
