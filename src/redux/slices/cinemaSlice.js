import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedule: {},
    scheduleFilter: [],
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
};

export const getSchedule = createAsyncThunk(
    "movies/get_schedule",
    async (id, { rejectWithValue }) => {
        try {
            const url = `${import.meta.env.VITE_BASE_API_URL}/movies/${id}/schedules`;
            const resp = await fetch(url);

            if (!resp.ok) throw resp.statusText;
            const data = await resp.json();
            return data.result;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getScheduleFilter = createAsyncThunk(
    "movies/get_schedule_filter",
    async ({id, date, time, location}, {rejectWithValue}) => {
        try {
            let url = `${import.meta.env.VITE_BASE_API_URL}/movies/${id}/schedule?`
            url += `date=${date}&`
            url += `time=${time}&`
            url += `location=${location}`

            const resp = await fetch(url)

            if (!resp.ok) throw resp.statusText;
            const data = await resp.json();
            return data.result;
        } catch (err) { return rejectWithValue(err); }
    }
)

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getScheduleFilter.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.error = null;
            })
            .addCase(getScheduleFilter.fulfilled, (state, { payload }) => {
                state.scheduleFilter = payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getScheduleFilter.rejected, (state, { payload, error }) => {
                state.error = { payload, error };
                state.isFailed = true;
                state.isLoading = false;
            })

            .addCase(getSchedule.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.error = null;
            })
            .addCase(getSchedule.fulfilled, (state, { payload }) => {
                state.schedule = payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getSchedule.rejected, (state, { payload, error }) => {
                state.error = { payload, error };
                state.isFailed = true;
                state.isLoading = false;
            })
    },
});

export default cinemaSlice.reducer;
