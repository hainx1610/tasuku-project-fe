import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default slice.reducer;
