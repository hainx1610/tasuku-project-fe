import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import userReducer from "./features/user/userSlice";
import projectReducer from "./features/project/projectSlice";
import invitationReducer from "./features/invitation/invitationSlice";

const rootReducer = {
  task: taskReducer,
  user: userReducer,
  project: projectReducer,
  invitation: invitationReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
