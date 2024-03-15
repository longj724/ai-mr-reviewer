"use client";
// External Dependencies
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MergeRequest } from "~/lib/types";
import Link from "next/link";

// Relative Dependencies
import { cn } from "~/lib/utils";

type Props = {
  children?: React.ReactNode;
  params: {
    groupName: string;
    projectID: string;
  };
};

const Layout = ({ children, params: { groupName, projectID } }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MergeRequest[]>([]);

  const { data: mergeRequests } = useQuery(
    [groupName, projectID],
    async () =>
      (await fetch(
        `https://gitlab.com/api/v4/projects/${projectID}/merge_requests/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json())) as Promise<MergeRequest[]>,
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (mergeRequests && mergeRequests.length > 0) {
        const searchResults = mergeRequests.filter((mergeRequest) =>
          mergeRequest.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(searchResults);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for a merge request by title"
              required
              value={searchQuery}
              onChange={onSearch}
            />
          </div>
        </div>
        <div>
          <div
            id="dropdown"
            className={cn(
              !searchResults.length || searchQuery === "" ? "hidden" : "",
              "z-10 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700",
            )}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {searchResults.map(({ id, iid, title }) => (
                <li key={id} className="cursor-pointer dark:hover:text-white">
                  <Link
                    onClick={clearSearchResults}
                    href={`/repositories/${groupName}/${projectID}/${iid}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
