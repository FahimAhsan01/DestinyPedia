import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import GearReducer from "./features/gearSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    gear: GearReducer,
  },
});
