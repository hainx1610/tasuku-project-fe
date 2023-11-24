import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import UserPasswordChangeForm from "@/app/features/user/UserPasswordChangeForm";

function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-center h-full">
      <Tabs
        defaultValue="password"
        className=" absolute top-1/4 self-center w-80 "
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2 flex flex-col items-start ">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="disabled:opacity-100 text-center"
                  disabled={true}
                  id="name"
                  defaultValue={user!.name}
                />
              </div>
              <div className="space-y-2 flex flex-col items-start ">
                <Label htmlFor="role">Role</Label>
                <Input
                  className="disabled:opacity-100 text-center"
                  disabled={true}
                  id="role"
                  defaultValue={user!.role}
                />
              </div>
            </CardContent>
            {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div> */}
              <UserPasswordChangeForm />
            </CardContent>
            {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AccountPage;
