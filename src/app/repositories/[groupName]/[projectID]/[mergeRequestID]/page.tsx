"use client";
// External Dependencies
import { useQuery } from "@tanstack/react-query";

// Relative Dependencies
import { MergeRequestFileDiff } from "~/lib/types";
import FileDiff from "~/app/_components/FileDiff";

type Props = {
  params: {
    groupName: string;
    projectID: string;
    mergeRequestID: string;
  };
};

const Page = ({ params: { groupName, projectID, mergeRequestID } }: Props) => {
  const { data: mergeRequestDiffs } = useQuery(
    [groupName, projectID, mergeRequestID],
    async () =>
      (await fetch(
        `https://gitlab.com/api/v4/projects/${projectID}/merge_requests/${mergeRequestID}/diffs`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json())) as Promise<MergeRequestFileDiff[]>,
  );

  return (
    <div className="flex h-full flex-col gap-2">
      {mergeRequestDiffs?.map((diffInfo) => (
        <FileDiff diffInfo={diffInfo} key={diffInfo.new_path} />
      ))}
    </div>
  );
};

export default Page;
