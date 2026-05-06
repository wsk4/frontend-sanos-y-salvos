import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Reducer temporal para evitar el error de "valid reducer"
    ui: (state = {}) => state, 
  },
});