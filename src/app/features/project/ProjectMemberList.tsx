import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUsersByProject } from "../user/userSlice";
import useAuth from "@/hooks/useAuth";
import { editProject, getSingleProject } from "./projectSlice";

function ProjectMemberList() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  //   if (user!.role === "manager") dispatch(getAllUsers());

  const { selectedProject } = useSelector(
    (state) => state.project,
    shallowEqual
  );

  const projectId = selectedProject?._id;

  const { usersById, currentUsers, allUsers } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (selectedProject?._id) dispatch(getUsersByProject(selectedProject._id));
  }, [dispatch, selectedProject]);

  useEffect(() => {
    if (user!.role === "manager") dispatch(getAllUsers());
  }, [dispatch, user]);

  const members = currentUsers.map((memberId) => usersById[memberId]);
  //   const members = selectedProject.includeMembers;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Members...</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[220px]">
        {members.map((member) => (
          <DropdownMenuItem
            key={member._id}
            onClick={(e) => e.preventDefault()}
          >{`${member.name} - ${member._id}`}</DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          {user!.role === "manager" && (
            <DropdownMenuSubTrigger>Add Member</DropdownMenuSubTrigger>
          )}
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value="">
              {allUsers.map((each) => (
                <DropdownMenuRadioItem
                  key={each._id}
                  value={each._id}
                  data-set={each._id}
                  onClick={async (e) => {
                    const targetValue = (
                      e.target as HTMLTextAreaElement
                    ).getAttribute("data-set");
                    dispatch(
                      editProject({
                        addedMemberId: targetValue,
                        projectId,
                      })
                    );
                  }}
                >
                  {`${each.name} - ${each._id}`}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectMemberList;
