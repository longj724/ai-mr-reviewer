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

export type MergeRequest = {
  id: string;
  iid: string;
  title: string;
  description: string;
  // author: User;
  // assignee: User;
  state: string;
  created_at: string;
  updated_at: string;
  merged_at: string;
  closed_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  merge_commit_sha: string;
  user_notes_count: number;
  discussion_locked: boolean;
  discussion_locked_at: string;
  merge_status: string;
  target_project_id: string;
  source_project_id: string;
};

export type MergeRequestDiff = {
  diff: string;
  new_path: string;
  old_path: string;
};

export type ParsedDiff = {
  oldCode: string;
  newCode: string;
  startLineOld: number;
  lineCountOld: number;
  startLineNew: number;
  lineCountNew: number;
};

export type SidebarItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
};
