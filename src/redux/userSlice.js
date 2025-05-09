import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => null,  // 👈 Fixed here
    },
});

export const { addUser, removeUser } = userSlice.actions;  // 👈 And here

export default userSlice.reducer;
