import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: {},
};

const detailSlice = createSlice({
  initialState,
  name: "movie",
  reducers: {
    getDetail: (state, { payload }) => {
      Object.assign(state.detail, payload);
    },
  },
});

export const { getDetail } = detailSlice.actions;

export default detailSlice.reducer;
