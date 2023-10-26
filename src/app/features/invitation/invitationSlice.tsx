import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "invitation",
  initialState,
  reducers: {},
});

export default slice.reducer;
