import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from '../../store'

import apiService from "../../apiService";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  selectedTask: null,
  // tasksById: {},
  // currentPageTasks: [],
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
    getSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedTask = action.payload;
    },
    editTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // const editedTask = action.payload;
      state.selectedTask = action.payload;
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

export const getSingleTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/tasks/${taskId}`);

    dispatch(slice.actions.getSingleTaskSuccess(response.data.data));
    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    console.error(error.message);
    // toast.error(error.message);
  }
};

export const editTask =
  ({ title, description, status, priority, taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`, {
        name: title,
        description,
        status,
        priority,
      });
      console.log(response);
      dispatch(slice.actions.editTaskSuccess(response.data.data));
      toast.success("Your task has been updated.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
