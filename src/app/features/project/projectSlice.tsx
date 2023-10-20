import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  projectsById: {},
  currentProjects: [],

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
      const newProject = action.payload;

      state.projectsById[newProject._id] = newProject;
      state.currentProjects.unshift(newProject._id);

      state.selectedProject = action.payload;
    },

    getSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedProject = action.payload;
    },

    getProjectsByUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const projects = action.payload;
      projects.forEach((project) => {
        state.projectsById[project._id] = project;

        if (!state.currentProjects.includes(project._id))
          state.currentProjects.push(project._id);
      });
    },
  },
});

export const createProject =
  ({ title, description }) =>
  async (dispatch: any) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/projects", {
        name: title,
        description,
      });
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

export const getProjectsByUser = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/projects/users/${userId}`);

    dispatch(slice.actions.getProjectsByUserSuccess(response.data.data));

    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
