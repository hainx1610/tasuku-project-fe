// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from '../../store'

import apiService from "../../apiService";

import { toast } from "react-toastify";
import { fDate } from "@/utils/formatTime";

const initialState = {
  isLoading: false,
  error: null,
  selectedTask: null,
  tasksById: {},
  currentPageTasks: [],
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
      const newTaskDuedate = action.payload.dueDate;
      // newTask.assigneeName = action.payload.assignedTo?.name
      newTask.dueDateDisplayed = newTaskDuedate
        ? fDate(newTaskDuedate)
        : undefined;
      state.tasksById[newTask._id] = newTask;
      state.currentPageTasks.unshift(newTask._id);
    },
    getSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedTask = action.payload;
    },
    getTasksByProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const tasks = action.payload;
      tasks.forEach((task) => {
        const assigneeName = task.assignedTo ? task.assignedTo.name : undefined;
        const assigneeId = task.assignedTo ? task.assignedTo._id : undefined;
        const dueDateDisplayed = task.dueDate ? fDate(task.dueDate) : undefined;
        const taskEnhanced = {
          ...task,
          assigneeId,
          assigneeName,
          dueDateDisplayed,
        };
        state.tasksById[task._id] = taskEnhanced;

        if (!state.currentPageTasks.includes(task._id))
          state.currentPageTasks.push(task._id);
      });
    },

    resetTasks(state) {
      state.tasksById = {}; // empty obj
      state.currentPageTasks = []; // empty array
    },

    editTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { description, status, priority, assignedTo, dueDate } =
        action.payload;

      state.tasksById[action.payload._id].description = description;
      state.tasksById[action.payload._id].status = status;
      state.tasksById[action.payload._id].priority = priority;
      state.tasksById[action.payload._id].assignedTo = assignedTo
        ? assignedTo
        : undefined;
      state.tasksById[action.payload._id].assigneeName = assignedTo?.name;
      state.tasksById[action.payload._id].dueDate = dueDate
        ? dueDate
        : undefined;
      state.tasksById[action.payload._id].dueDateDisplayed = dueDate
        ? fDate(dueDate)
        : undefined;
    },

    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      //action.payload here is not from res but from req
      state.currentPageTasks = state.currentPageTasks.filter(
        (taskId) => taskId !== action.payload
      );
      delete state.tasksById[action.payload];
    },
  },
});

export const createTask =
  ({ title, description, inProject, status, priority, dueDate }) =>
  async (dispatch: any) => {
    // middleware

    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/tasks", {
        name: title,
        description,
        inProject,
        status,
        priority,
        dueDate,
      });
      dispatch(slice.actions.createTaskSuccess(response.data.data));
      // response.xxx is the action.payload
      toast.success("Your task has been created.");
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
    // console.error(error.message);
    toast.error(error.message);
  }
};

export const getTasksByProject = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/tasks/projects/${taskId}`);

    dispatch(slice.actions.resetTasks());
    dispatch(slice.actions.getTasksByProjectSuccess(response.data.data));

    // response.xxx is the action.payload
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editTask =
  ({ description, status, priority, taskId, assignedTo, dueDate }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`, {
        // name: title,
        description,
        status,
        priority,
        assignedTo,
        dueDate,
      });
      // console.log(response);
      dispatch(slice.actions.editTaskSuccess(response.data.data));
      toast.success("Your task has been updated.");
    } catch (error: any) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteTask = (deleteTaskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`tasks/${deleteTaskId}`);
    dispatch(slice.actions.deleteTaskSuccess(deleteTaskId));
    toast.success("Task deleted.");
  } catch (error: any) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
