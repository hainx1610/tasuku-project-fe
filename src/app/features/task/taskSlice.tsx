import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from '../../store'

import apiService from "../../apiService";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload;
    },
  },
});

export const createTask =
  ({ name, description, inProject }) =>
  async (dispatch: any) => {
    // middleware

    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/Tasks", {
        name,
        description,
        inProject,
      });
      dispatch(slice.actions.createTaskSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error: any) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
