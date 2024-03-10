export type Group = {
  id: string;
  name: string;
  path: string;
  avatar_url: string;
  web_url: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
  path: string;
  avatar_url: string;
  web_url: string;
};

export type SidebarItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
};
