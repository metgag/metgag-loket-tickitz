import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: {},
    schedule: {},
    seats: [],
    payment: {},
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        selectedMovie: (state, { payload }) => {
            state.movie = payload;
        },
        selectedSchedule: (state, { payload }) => {
            state.schedule = payload;
        },
        selectedSeats: (state, { payload }) => {
            state.seats = payload;
        },
        setPayment: (state, { payload }) => {
            state.payment = payload;
        },
        clearOrder: () => initialState,
    },
});

export const { 
    selectedMovie, selectedSchedule, selectedSeats, setPayment, clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
