import { getRegister } from "@/lib/services/apiAuth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  user: unknown;
  error?: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  status: "idle",
  user: null,
  error: undefined,
};

// Pass the user data as payload
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await getRegister({ name, email, password });
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token || null;
        state.isAuthenticated = true;

        // set the token into the localStorage
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isAuthenticated = false;

        // clear the token if failed
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
