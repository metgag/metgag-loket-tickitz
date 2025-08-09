import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: {
    id: null,
    email: null,
    pwd: null
  }
};

export const currUserSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      Object.assign(state.currUser, payload);
    },
    removeCurrUser: (state) => {
      Object.assign(state.currUser, {
        id: null,
        email: null,
        pwd: null
      })
    }
  }
});

export const { addUser, removeCurrUser } = currUserSlice.actions;

export default currUserSlice.reducer;
