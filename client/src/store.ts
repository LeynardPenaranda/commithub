import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "@/reducers/alertSlice";
import otherReducer from "@/reducers/otherSlice";
import authReducer from "@/reducers/authSlice";
const store = configureStore({
  reducer: {
    alert: alertReducer,
    other: otherReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
