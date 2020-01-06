import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Clipboard extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      trackData: this.props.trackData,
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
      <div>
        <CopyToClipboard
          text={tracksAsString(this.state.trackData)}
          onCopy={() => this.setState({ copied: true })}
        >
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: "red" }}>Copied.</span>
        ) : null}
      </div>
    );
  }
}

export default Clipboard;
