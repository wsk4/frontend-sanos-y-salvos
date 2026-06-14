// src/app/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isReady: false },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isReady = true;
        },
        clearToken: (state) => {
            state.token = null;
            state.isReady = true;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;