import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    token: null,
    email: null,
    role: null,
    issuedAt: null,
    expiresAt: null,
};

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, { payload }) => {
            const decoded = jwtDecode(payload.token);
            const { role, iat, exp, email } = decoded;

            state.token = payload.token;
            state.email = email;
            state.role = role;
            state.issuedAt = iat;
            state.expiresAt = exp;
        },
        clearUser: (state) => {
            state.token = null;
            state.email = null;
            state.role = null;
            state.issuedAt = null;
            state.expiresAt = null;
        },
    },
});

export const {
    setUser, clearUser
} = authSlice.actions;

export default authSlice.reducer;
