import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AlertType = {
  id: string;
  msg: string;
  alertType: string;
};

const initialState: AlertType[] = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<AlertType>) {
      state.push(action.payload);
    },
    removeAlert(state, action: PayloadAction<string>) {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
