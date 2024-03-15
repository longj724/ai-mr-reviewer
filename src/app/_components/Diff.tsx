// External Dependencies
import ReactDiffViewer, {
  ReactDiffViewerStylesOverride,
} from "react-diff-viewer";

// Relative Dependencies
import { ParsedDiff } from "~/lib/types";

type Props = {
  parsedDiff: ParsedDiff;
};

const Diff = ({ parsedDiff }: Props) => {
  const styles: ReactDiffViewerStylesOverride = {
    diffContainer: {
      width: parsedDiff.summary ? "60%" : "100%",
      borderRadius: "4px",
    },
  };

  return (
    <div className="flex flex-row">
      <ReactDiffViewer
        styles={styles}
        splitView={false}
        linesOffset={parsedDiff.startLineOld}
        oldValue={parsedDiff.oldCode}
        newValue={parsedDiff.newCode}
      />
      {parsedDiff.summary !== null && (
        <div className="flex w-2/5 flex-row">
          <div className="h-full w-full rounded-lg p-2">
            <div className=" rounded-md bg-white p-2">
              <p className="ml-2">{parsedDiff.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diff;
