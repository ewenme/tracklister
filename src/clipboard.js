import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Clipboard extends Component {

  render() {
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

    return (
      <React.Fragment>
        <CopyToClipboard
          text={tracksAsString(this.props.track_data, this.props.track_numbers)}
          onCopy={() => this.setState({ copied: true })}
        >
          <button className="muted-button">copy to clipboard</button>
        </CopyToClipboard>
      </React.Fragment>
    );
  }
}

export default Clipboard;
