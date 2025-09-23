import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    uid: null,
    email: null,
    token: null,
    expiresAt: null,
    isExpired: false,
};

export const tokenSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.uid = payload.uid; 
            const decoded = jwtDecode(payload.token);

            state.email = decoded.email;
            state.token = payload;
            state.expiresAt = new Date(decoded.exp * 1000).toISOString();
            state.isExpired = false;
        },
        logout: (state) => {
            state.uid = null;
            state.email = null;
            state.token = null;
            state.expiresAt = null;
            state.isExpired = false;
        },
        tokenExpired: (state) => {
            state.isExpired = true;
        },
    },
});

export const { login, logout, tokenExpired } = tokenSlice.actions;
export default tokenSlice.reducer;
