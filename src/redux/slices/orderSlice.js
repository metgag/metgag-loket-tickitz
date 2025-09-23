import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleId: null,
    movieId: null,
    date: null,
    time: null,
    location: null,
    cinemaId: null,
    seats: [],
    selectedCinema: {},
    selectedMovie: {},
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        bookTicket: (state, { payload }) => {
            Object.assign(state, payload);
        },
    },
});

export const { bookTicket } = orderSlice.actions;

export default orderSlice.reducer;
