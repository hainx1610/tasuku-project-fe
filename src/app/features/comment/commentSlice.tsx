import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  commentsById: {},
  currentPageComments: [],
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newComment = action.payload;

      state.commentsById[newComment._id] = newComment;
      state.currentPageComments.unshift(newComment._id);
    },

    getCommentsByTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comments = action.payload;

      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;

        if (!state.currentPageComments.includes(comment._id))
          state.currentPageComments.push(comment._id);
      });
    },
  },
});

export const createComment =
  ({ content, aboutTask }) =>
  async (dispatch: any) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        aboutTask,
      });
      dispatch(slice.actions.createCommentSuccess(response.data.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getCommentsByTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/comments/tasks/${taskId}`);

    dispatch(slice.actions.getCommentsByTaskSuccess(response.data.data));

    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
