// @ts-nocheck
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

    resetProjects(state) {
      state.projectsById = {}; // empty obj
      state.currentProjects = []; // empty array
    },

    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProject = action.payload;

      state.projectsById[newProject._id] = newProject;
      state.currentProjects.unshift(newProject._id);

      // state.selectedProject = action.payload;
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

    editProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedProject.includeMembers = action.payload.includeMembers;
    },
  },
});

export const createProject =
  ({ title, description, from, to }) =>
  async (dispatch: any) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/projects", {
        name: title,
        description,
        startAt: from,
        endAt: to,
      });
      dispatch(slice.actions.createProjectSuccess(response.data.data));
      toast.success("Your project has been created.");
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

    dispatch(slice.actions.resetProjects());
    dispatch(slice.actions.getProjectsByUserSuccess(response.data.data));

    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editProject =
  ({ addedMemberId, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/projects/${projectId}`, {
        addedMemberId,
      });
      // console.log(response);
      dispatch(slice.actions.editProjectSuccess(response.data.data));
      toast.success("Your project has been updated.");
    } catch (error: any) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
