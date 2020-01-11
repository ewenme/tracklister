import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Clipboard extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      copied: false,
      track_numbers: this.props.track_numbers
    };

    this.state = this.initialState;
  }
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
          <button class="square-button">Copy to clipboard</button>
        </CopyToClipboard>
      </React.Fragment>
    );
  }
}

export default Clipboard;
