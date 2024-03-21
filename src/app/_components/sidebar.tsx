"use client";
// External Dependencies
import { Folder } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Relative Dependencies
import { Group, Project, SidebarItem as SidebarItemType } from "~/lib/types";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
  const { data: groups } = useQuery(
    ["groups"],
    async () =>
      (await fetch(
        `${process.env.NEXT_PUBLIC_BASE_GITLAB_URL}/api/v4/groups/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json())) as Promise<Group[]>,
  );

  const { data: groupsWithProjects } = useQuery({
    queryKey: ["groupsWithProjects"],
    enabled: !!groups,
    queryFn: async () =>
      await Promise.all(
        // Won't be undefinfed because of the enabled check
        (groups as Group[]).map(async (group) => {
          const projects = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_GITLAB_URL}/api/v4/groups/${group.id}/projects`,
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
      ),
  });

  const [sidebarItems, setSidebarItems] = useState<SidebarItemType[]>([]);

  useEffect(() => {
    if (groupsWithProjects) {
      setSidebarItems(
        groupsWithProjects.map((group) => ({
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
        })),
      );
    }
  }, [groupsWithProjects]);

  return (
    <div className="fixed hidden h-screen flex-1 overflow-scroll border-r border-zinc-200 bg-white md:flex md:w-60">
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
