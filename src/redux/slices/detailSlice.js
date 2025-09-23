import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { creditOptions, detailOptions } from "../../utils/movieOptions";

const initialState = {
  movie: {},
  crew: {},
  schedule: {},
  seat: [],
  usrInfo: {},
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null
};

export const getDetail = createAsyncThunk(
  "movie/detail_selected",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.request(detailOptions(id));
      const { data } = response;
      const { backdrop_path, genres, overview, poster_path, release_date, runtime, title } = data;

      const genresName = genres.map((e) => {
        return e.name;
      });

      return {
        backdrop_path, genresName, overview, poster_path, release_date, runtime, title
      };
    } catch (err) { return rejectWithValue(err); }
  }
);

export const getCredit = createAsyncThunk(
  "movie/credit_selected",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.request(creditOptions(id));
      const { cast, crew } = response.data;
      const result = {};

      const getCrew = crew.filter((e) => {
        const { job, name } = e;
        if (job == "Director") return name;
      });

      Object.assign(result, {
        director: getCrew,
        cast: cast.filter((e, i) => {
          if (i < 4) return e.name;
        })
      })

      return result;
    } catch (err) { return rejectWithValue(err); }
  }
);

const detailSlice = createSlice({
  name: "currDetail",
  initialState,
  reducers: {
    addSchedule: (state, { payload }) => {
      state.schedule = payload;
    },
    addSeat: (state, { payload }) => {
      state.seat = payload;
    },
    addUsrInfo: (state, { payload }) => {
      state.usrInfo = payload;
    }
    // addToStore: (state, { payload }) => {
    //   state.storeSelected.push(payload)
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetail.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getDetail.fulfilled, (state, { payload }) => {
        state.movie = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getDetail.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getCredit.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getCredit.fulfilled, (state, { payload }) => {
        state.crew = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getCredit.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })
  }
});

export const { addSchedule, addSeat } = detailSlice.actions;

export default detailSlice.reducer;
