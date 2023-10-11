import LoadingScreen from "@/components/LoadingScreen";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";

function HomePage() {
  const { user } = useAuth();

  const userMemberOf = user ? user["memberOf"] : [];
  console.log(userMemberOf);

  return (
    <Tabs defaultValue={userMemberOf[0]._id} className="flex">
      <TabsList className="flex flex-col h-screen">
        <TabsTrigger value={userMemberOf[0]._id}>
          {userMemberOf[0]._id}
        </TabsTrigger>
        <TabsTrigger value="project_2">project_2</TabsTrigger>
      </TabsList>
      <TabsContent value={userMemberOf[0]._id}>
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="project_2">Change your password here.</TabsContent>
    </Tabs>

    // <Tabs defaultValue="project_1" className="flex">
    //   <TabsList className="flex flex-col h-screen">
    //     <TabsTrigger value="project_1">Project 1</TabsTrigger>
    //     <TabsTrigger value="project_2">project_2</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="project_1">
    //     Make changes to your account here.
    //   </TabsContent>
    //   <TabsContent value="project_2">Change your password here.</TabsContent>
    // </Tabs>
  );
}

export default HomePage;
