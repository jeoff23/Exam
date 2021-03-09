import { configureStore, getDefautMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
