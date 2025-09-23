import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  isLoading: true,
  isSuccess: false,
  isFailed: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  "user/get_profile",
  async (token, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/users/`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await fetch(url, options)
      if (!resp.ok) throw resp.statusText;

      const data = resp.json()
      return data.result;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

const personalSlice = createSlice({
  name: "whoami",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })
  }
})

export default personalSlice.reducer;
