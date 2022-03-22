import { createSlice } from "@reduxjs/toolkit";

export const authenticate = createSlice({
  name: "authenticate",
  initialState: {
    value: "false",
  },
  reducers: {
    setAuthState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthState } = authenticate.actions;
export default authenticate.reducer;
