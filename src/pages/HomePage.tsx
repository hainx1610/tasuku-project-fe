import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import InvitationInput from "@/app/features/invitations/InvitationInput";

function HomePage() {
  const { user } = useAuth();

  const userMemberOf = user ? user["memberOf"] : [];
  const userRole = user ? user.role : undefined;

  return (
    <Tabs defaultValue={userMemberOf[0].name} className="flex space-x-4">
      <TabsList className="flex flex-col h-screen">
        {userRole === "manager" && (
          <TabsTrigger value="invite">Invite</TabsTrigger>
        )}
        <Separator className="my-3" />
        {userMemberOf.map((tabstrigger) => (
          <TabsTrigger value={tabstrigger.name} key={tabstrigger._id}>
            {tabstrigger.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="invite">
        <InvitationInput />
      </TabsContent>
      {userMemberOf.map((tabscontent) => (
        <TabsContent value={tabscontent.name} key={tabscontent._id}>
          {tabscontent.name +
            " " +
            tabscontent.description +
            tabscontent.includeTasks}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default HomePage;
