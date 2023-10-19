import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  selectedProject: null,
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // const newProject = action.payload;
      state.selectedProject = action.payload;
    },

    getSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedProject = action.payload;
    },
  },
});

export const createProject = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/tasks", {});
    dispatch(slice.actions.createProjectSuccess(response.data.data));
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleProject = (projectId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/projects/${projectId}`);

    dispatch(slice.actions.getSingleProjectSuccess(response.data.data));
    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
