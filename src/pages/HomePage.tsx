import useAuth from "@/hooks/useAuth";

function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <div className="p-6 space-y-10 my-5 flex flex-col justify-center items-center h-full">
        <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Good to see you there, {user!.name}.
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Choose a project from the left menu to view your tasks, or create a
          new one.
        </h4>
      </div>
    </>
  );
}

export default HomePage;
