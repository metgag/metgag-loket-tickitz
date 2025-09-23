import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      const index = state.findIndex((user) => {
        return user.email === payload.email;
      });

      if (index === -1) {
        state.push({
          id: Math.floor(Math.random() * 1000) + 1,
          email: payload.email,
          pwd: payload.pwd,
        });
      }
    },
    removeUser: (state, { payload }) => {
      const index = state.findIndex((user) => {
        return user.email === payload.email;
      });

      state.splice(index, 1);
    },
    resetPwd: (state, { payload }) => {
      const index = state.findIndex((user) => {
        return user.email === payload.email;
      });

      if (index !== -1) {
        state[index] = {
          ...state[index],
          pwd: payload.pwd
        };
      }
    }
  }
});

export const { addUser, removeUser, resetPwd } = authSlice.actions;

export default authSlice.reducer;
