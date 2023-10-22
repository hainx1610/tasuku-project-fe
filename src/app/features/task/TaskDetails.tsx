import React, { useEffect, useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTask } from "./taskSlice";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createComment, getCommentsByTask } from "../comment/commentSlice";
import { fDate } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function TaskDetails() {
  const params = useParams();
  const taskId = params.taskId;

  const dispatch = useDispatch();
  const { selectedTask, isLoading } = useSelector(
    (state) => state.task,
    shallowEqual
  );
  // shallowEqual for when selectedTask is changed internally, because it's an obj

  const { commentsById, currentPageComments } = useSelector(
    (state) => state.comment,
    shallowEqual
  );

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTask(taskId));
      dispatch(getCommentsByTask(taskId));
    }
  }, [dispatch, taskId]);

  const comments = currentPageComments.map(
    (commentId) => commentsById[commentId]
  );

  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ aboutTask: taskId, content }));
    setContent(""); // clear content for a new comment
  };

  return (
    <div className="container mx-auto py-10 flex justify-center">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>{selectedTask?.name}</CardTitle>
            <CardDescription>{selectedTask?.description}</CardDescription>
            <CardDescription>{`status: ${selectedTask?.status} - priority: ${selectedTask?.priority}`}</CardDescription>
            <CardDescription>{`Due: ${
              selectedTask?.dueDate
                ? fDate(selectedTask?.dueDate)
                : "No due date"
            } `}</CardDescription>
          </CardHeader>
          <CardContent>
            {comments.map((comment) => (
              <Card className="my-2" key={comment._id}>
                <CardHeader>
                  <CardTitle className="text-left text-md">
                    {comment.author.name}
                  </CardTitle>
                  <CardDescription className="text-left text-xs">
                    {fDate(comment.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-left">
                  {comment.content}
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className=" w-[500px]">
            <div className=" grid w-full gap-2 ">
              <form onSubmit={handleSubmit}>
                <Textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Type your comment here."
                />
                <Button className="my-2">+ Comment</Button>
              </form>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default TaskDetails;
