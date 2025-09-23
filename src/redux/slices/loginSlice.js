import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    isLogged: false,
};

export const loginSlice = createSlice({
  name: 'whoami',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      Object.assign(state, {
        email: payload,
        isLogged: true,
      });
    },
    rmCurrUser: (state) => {
      Object.assign(state, {
        email: null,
        isLogged: false,
      });
    },
  },
});

export const { addUser, rmCurrUser } = loginSlice.actions;

export default loginSlice.reducer;
