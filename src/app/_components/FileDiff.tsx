"use client";
// External Dependencies
import { useState } from "react";
import { ChevronDown, ChevronRight, ClipboardCopy } from "lucide-react";

// Relative Dependencies
import { MergeRequestDiff, ParsedDiff } from "~/lib/types";
import Diff from "./Diff";
import { Button } from "~/components/ui/button";

type Props = {
  diffInfo: MergeRequestDiff;
};

const parseDiff = (diffString: string): ParsedDiff[] => {
  const lines = diffString.split("\n");
  const diffs: ParsedDiff[] = [];
  let currentDiff: ParsedDiff | null = null;

  lines.forEach((line) => {
    if (line.startsWith("@@")) {
      if (currentDiff) diffs.push(currentDiff);

      const headerMatch = line.match(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
      if (headerMatch) {
        const startLineOld = +headerMatch[1]!;
        const lineCountOld = +headerMatch[2]!;
        const startLineNew = +headerMatch[3]!;
        const lineCountNew = +headerMatch[4]!;

        currentDiff = {
          oldCode: "",
          newCode: "",
          startLineOld,
          lineCountOld,
          startLineNew,
          lineCountNew,
        };
      } else {
        console.error("Invalid diff header format:", line);
        return;
      }
    } else if (currentDiff) {
      if (line.startsWith("-")) {
        currentDiff.oldCode += line.substring(1) + "\n";
      } else if (line.startsWith("+")) {
        currentDiff.newCode += line.substring(1) + "\n";
      } else {
        currentDiff.oldCode += line + "\n";
        currentDiff.newCode += line + "\n";
      }
    }
  });

  if (currentDiff) diffs.push(currentDiff);

  return diffs;
};

const FileDiff = ({ diffInfo }: Props) => {
  const [generateDiffSummary, setGenerateDiffSummary] = useState(false);
  const [showDiff, setShowDiff] = useState(true);
  const diffs = parseDiff(diffInfo.diff);
  const { old_path: oldPath, new_path: newPath } = diffInfo;

  const onShowDiff = () => {
    setShowDiff(!showDiff);
  };

  return (
    <div className="w-full rounded-lg bg-gray-200">
      <div className="ml-4 flex w-full flex-row p-2">
        <div className="flex flex-row items-center gap-2">
          <button
            className="rounded-md p-[1px] hover:bg-gray-100"
            onClick={onShowDiff}
          >
            {showDiff ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <p>{newPath}</p>
        </div>
        <Button className="ml-auto mr-8 h-8">Generate Diff Summary</Button>
      </div>
      {showDiff &&
        diffs.map((diff) => <Diff parsedDiff={diff} key={diff.oldCode} />)}
    </div>
  );
};

export default FileDiff;
