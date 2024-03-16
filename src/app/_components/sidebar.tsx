// External Dependencies
import { Folder } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

// Relative Dependencies
import { Group, Project, SidebarItem as SidebarItemType } from "~/lib/types";
import SidebarItem from "./sidebar-item";

const Sidebar = async () => {
  const groups: Group[] = await fetch("https://gitlab.com/api/v4/groups/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
    },
  }).then((res) => res.json());

  const groupsWithProjects = await Promise.all(
    groups.map(async (group) => {
      const projects = await fetch(
        `https://gitlab.com/api/v4/groups/${group.id}/projects`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json());
      return {
        ...group,
        projects,
      };
    }),
  );

  const sidebarItems: SidebarItemType[] = groupsWithProjects.map((group) => ({
    title: group.name,
    path: `/repositories/${group.path}`,
    icon: <Folder width="24" height="24" />,
    submenu: true,
    subMenuItems: group.projects.map((project: Project) => {
      return {
        title: project.name,
        path: `/repositories/${group.path}/${project.id}`,
        icon: <Folder width="24" height="24" />,
      };
    }),
  }));

  return (
    <div className="fixed hidden h-screen flex-1 border-r border-zinc-200 bg-white md:flex md:w-60">
      <div className="flex w-full flex-col ">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className="ml-4 flex h-12 w-full flex-row items-center justify-center  space-x-3 md:justify-start"
          >
            <p className="hidden text-xl font-bold md:flex">AI Code Review</p>
          </Link>
          <div className="ml-auto mr-6">
            <UserButton />
          </div>
        </div>
        <hr className="h-[1px] w-full bg-gray-200" />
        <div className="mt-4 flex flex-col  space-y-2 md:px-6">
          {sidebarItems.map((item, idx) => (
            <SidebarItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
