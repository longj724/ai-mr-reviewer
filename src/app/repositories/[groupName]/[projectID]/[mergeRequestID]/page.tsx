"use client";
// External Dependencies
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Relative Dependencies
import { MergeRequestDiff } from "~/lib/types";

type Props = {
  params: {
    groupID: string;
    projectID: string;
    mergeRequestID: string;
  };
};

const Page = ({ params: { groupID, projectID, mergeRequestID } }: Props) => {
  const { data: mergeRequestDiffs } = useQuery(
    [groupID, projectID, mergeRequestID],
    async () =>
      (await fetch(
        `https://gitlab.com/api/v4/projects/${projectID}/merge_requests/${mergeRequestID}/diffs`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json())) as Promise<MergeRequestDiff[]>,
  );

  return <div>MR Page</div>;
};

export default Page;
