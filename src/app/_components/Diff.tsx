// External Dependencies
import ReactDiffViewer, {
  ReactDiffViewerStylesOverride,
} from "react-diff-viewer-continued";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

// Relative Dependencies
import { ParsedDiff } from "~/lib/types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

type Props = {
  parsedDiff: ParsedDiff;
};

const Diff = ({ parsedDiff }: Props) => {
  const [displayedComments, setDisplayedComments] = useState<JSX.Element[]>([]);
  const [clickedCommentLines, setClickedCommentLines] = useState<number[]>([]);
  const { newCode, oldCode, startLineOld, summary } = parsedDiff;
  const styles: ReactDiffViewerStylesOverride = {
    diffContainer: {
      width: summary ? "60%" : "100%",
      borderRadius: "4px",
      fontSize: "0.8rem",
    },
  };

  const onCommentClick = (event: React.MouseEvent, diffData: any) => {
    if (clickedCommentLines.includes(diffData.lineNumber)) {
      return;
    }
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    const commentBox = (
      <div
        style={{
          marginTop: "10px",
          zIndex: 100,
          position: "absolute",
          width: "60%",
          height: "100px",
          backgroundColor: "red",
          top: `${rect.top + rect.height + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`,
        }}
      >
        <Button
          onClick={() => {
            setClickedCommentLines((prev) =>
              prev.filter((line) => line !== diffData.lineNumber),
            );
            setDisplayedComments((prev) =>
              prev.filter((comment) => comment !== commentBox),
            );
          }}
        >
          Close
        </Button>
        <pre className="text-sm">{diffData.comment}</pre>
      </div>
    );

    setClickedCommentLines((prev) => [...prev, diffData.lineNumber]);
    setDisplayedComments((prev) => [...prev, commentBox]);
  };

  return (
    <div className="flex flex-row">
      <ReactDiffViewer
        styles={styles}
        splitView={false}
        linesOffset={startLineOld}
        oldValue={oldCode}
        newValue={newCode}
        renderGutter={(diffData) => (
          <td
            className={cn(
              diffData.styles.gutter,
              diffData.type === undefined && diffData.styles.emptyGutter,
            )}
            title={"extra info"}
            onClick={(event) => onCommentClick(event, diffData)}
          >
            <pre
              className={cn(
                diffData.styles.lineNumber,
                "flex h-full flex-row items-center justify-center",
              )}
            >
              <MessageSquare size={14} color="black" />
            </pre>
          </td>
        )}
      />
      {displayedComments}
      {summary !== null && (
        <div className="flex w-2/5 flex-row">
          <div className="h-full w-full rounded-lg p-2">
            <div className=" rounded-md bg-white p-2">
              <p className="ml-2">{summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diff;
