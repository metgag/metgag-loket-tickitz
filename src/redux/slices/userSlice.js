import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first_name: null,
    last_name: null,
    phone_number: null,
    point_count: null,
    avatar: null,
};

const userSlice = createSlice({
    initialState,
    name: "info",
    reducers: {
        setInfo: (state, { payload }) => {
            state.first_name = payload.first_name;
            state.last_name = payload.last_name;
            state.phone_number = payload.phone_number;
            state.point_count = payload.point_count;
            state.avatar = payload.avatar;
        },
        updateUser: (state, action) => {
            console.log(action);
            // merge only updated fields
            Object.entries(action.payload).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    state[key] = value;
                }
            });
        },
        clearInfo: () => initialState,
    },
});

export const { setInfo, updateUser,clearInfo } = userSlice.actions;

export default userSlice.reducer;
