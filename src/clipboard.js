import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Clipboard extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      copied: false
    };

    this.state = this.initialState;
  }
  render() {
    function tracksAsString(props) {
      const rows = props.map(row => {
        return row.artist + " - " + row.track;
      });
      return rows.join("\n");
    }

    return (
      <CopyToClipboard
        text={tracksAsString(this.props.trackData)}
        onCopy={() => this.setState({ copied: true })}
      >
        <button class="square-button">Copy to clipboard</button>
      </CopyToClipboard>
    );
  }
}

export default Clipboard;
