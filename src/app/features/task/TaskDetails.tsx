import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTask } from "./taskSlice";
import LoadingScreen from "@/components/LoadingScreen";

function TaskDetails() {
  const params = useParams();
  const taskId = params.taskId;

  const dispatch = useDispatch();
  const { selectedTask, isLoading } = useSelector(
    (state) => state.task,
    shallowEqual
  );
  // shallowEqual for when selectedUser is changed internally, because it's an obj

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTask(taskId));
    }
  }, [dispatch, taskId]);

  return (
    <div className="container mx-auto py-10">
      {isLoading ? <LoadingScreen /> : selectedTask.name + selectedTask._id}
    </div>
  );
}

export default TaskDetails;
