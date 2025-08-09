import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => {
        return user.email === payload.email;
      });

      if (index === -1) {
        state.users.push({
          id: Math.floor(Math.random() * 1000) + 1,
          email: payload.email,
          pwd: payload.pwd,
        });
      }
    },
    removeUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => {
        return user.email === payload.email;
      });

      state.users.splice(index, 1);
    }
  }
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
