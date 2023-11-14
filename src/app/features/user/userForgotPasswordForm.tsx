import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UserForgotPasswordForm() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Email
        </Label>
        <Input id="name" className="col-span-3" />
      </div>
    </div>
  );
}

export default UserForgotPasswordForm;
