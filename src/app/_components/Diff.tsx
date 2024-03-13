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
      width: "60%",
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
      <div className="flex w-2/5 flex-row">
        <div className="h-full w-full rounded-lg p-2">
          <div className="h-full  bg-white">
            <p className="ml-2">Code Summary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diff;
