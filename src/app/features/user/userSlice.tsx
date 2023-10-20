import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  usersById: {},
  currentUsers: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUsersByProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const users = action.payload;
      users.forEach((user) => {
        state.usersById[user._id] = user;

        if (!state.currentUsers.includes(user._id))
          state.currentUsers.push(user._id);
      });
    },
  },
});

export const getUsersByProject = (projectId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/projects/${projectId}`);

    dispatch(slice.actions.getUsersByProjectSuccess(response.data.data));

    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
