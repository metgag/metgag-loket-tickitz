import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const historySlice = createSlice({
  name: "histories",
  initialState,
  reducers: {
    addHistory: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { addHistory } = historySlice.actions;

export default historySlice.reducer;
