import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerInput: "",
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    setValue(state, action) {
      state.registerInput = action.payload;
    },
  },
});

export const { setValue } = otherSlice.actions;
export default otherSlice.reducer;
