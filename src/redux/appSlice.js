// redux/appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: true,  // Track if the sidebar menu is open
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = appSlice.actions;
export default appSlice.reducer;
