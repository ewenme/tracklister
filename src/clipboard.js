import React from "react";
import useClipboard from "react-use-clipboard";

function tracksAsString(tracks, track_no_status) {
  const rows = tracks.map((row, index) => {
    if (track_no_status) {
      return index + 1 + ". " + row.artist + " - " + row.track;
    } else {
      return row.artist + " - " + row.track;
    }
  });
  return rows.join("\n");
}

function Clipboard(props) {

  const [isCopied, setCopied] = useClipboard(
    tracksAsString(props.track_data, props.track_numbers), {
      successDuration: 1000,
    }
    );

    return (
      <React.Fragment>
          <button className="muted-button" onClick={setCopied}>
            {isCopied ? "copied! 👍" : "copy to clipboard"}
            </button>
      </React.Fragment>
    );
}

export default Clipboard;
