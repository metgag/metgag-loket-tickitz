import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fname: null,
  pnumber: null
};

export const personalSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addInfo: (state, { payload }) => {
      Object.assign(state, {
        fname: payload.fname,
        pnumber: payload.pnumber,
      });
    },
  },
});

export const { addInfo } = personalSlice.actions;

export default personalSlice.reducer;
