import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleId: null,
    movieId: null,
    showDate: null,
    showTimeId: null,
    showLocationId: null,
    showCinemaName: null,
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setSchedule: (state, { payload }) => {
            state.scheduleId = payload.scheduleId;
            state.movieId = payload.movieId;
            state.showDate = payload.showDate;
            state.showTimeId = payload.showTimeId;
            state.showLocationId = payload.showLocationId;
            state.showCinemaName= payload.showCinemaName;
        },
        clearSchedule: () => initialState,
    },
});

export const { setSchedule, clearSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
