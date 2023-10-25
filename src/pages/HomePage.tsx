import React from "react";

import useAuth from "@/hooks/useAuth";

function HomePage() {
  const { user } = useAuth();

  // const userId = user!._id;

  // const userRole = user ? user.role : undefined;

  // const dispatch = useDispatch();

  // const { projectsById, currentProjects, isLoading } = useSelector(
  //   (state) => state.project
  // );

  // useEffect(() => {
  //   if (userId) dispatch(getProjectsByUser(userId));
  //   // no userId the first time
  // }, [dispatch, userId]);

  // const projects = currentProjects.map((projectId) => projectsById[projectId]);

  return (
    <>
      <div className="p-6 space-y-10 my-5 flex flex-col justify-center items-center h-full">
        <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Good to see you there, {user!.name}.
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Choose a project from the left to view your tasks.
        </h4>
      </div>

      {/* <TaskTable /> */}
    </>
  );
}

export default HomePage;
