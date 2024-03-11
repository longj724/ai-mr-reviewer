// External Dependencies
import { Folder } from "lucide-react";
import Link from "next/link";

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

  const sidebarItems: SidebarItemType[] = groupsWithProjects.map((group) => {
    return {
      title: group.name,
      path: `/repositories/${group.id}`,
      icon: <Folder width="24" height="24" />,
      submenu: true,
      subMenuItems: group.projects.map((project: Project) => {
        return {
          title: project.name,
          path: `/repositories/${group.path}/${project.id}`,
          icon: <Folder width="24" height="24" />,
        };
      }),
    };
  });

  return (
    <div className="fixed hidden h-screen flex-1 border-r border-zinc-200 bg-white md:flex md:w-60">
      <div className="flex w-full flex-col space-y-6">
        <Link
          href="/"
          className="flex h-12 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6"
        >
          <span className="h-7 w-7 rounded-lg bg-zinc-300" />
          <span className="hidden text-xl font-bold md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {sidebarItems.map((item, idx) => {
            return <SidebarItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
