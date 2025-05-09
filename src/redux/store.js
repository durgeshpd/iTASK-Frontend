import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import appSlice from "./appSlice";
import themeReducer from "./themeSlice"; // ✅ FIXED: use 'themeReducer' not 'useTheme'

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    app: appSlice,
    theme: themeReducer, // ✅ Add theme slice reducer here
  },
});

export default store;
