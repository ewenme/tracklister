import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TrackLayout = props => {
  const rows = props.trackData.map((row, index) => {
    return (
      <li key={index}>
        {row.artist} - {row.track}
      </li>
    );
  });

  const list_style = props.trackNumber ? "decimal" : "none";

  return <ol style={{ listStyleType: list_style }}>{rows}</ol>;
};

class Tracklist extends Component {
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

    const { trackData, trackNumber, toggleTrackNumbers } = this.props;

    return (
      <React.Fragment>
        <TrackLayout
          trackData={trackData}
          trackNumber={trackNumber}
          toggleTrackNumbers={toggleTrackNumbers}
        />
        <button onClick={() => this.props.toggleTrackNumbers()}>
          Toggle track numbers
        </button>
        <CopyToClipboard
          text={tracksAsString(this.state.trackData)}
          onCopy={() => this.setState({ copied: true })}
        >
          <button>Copy to clipboard</button>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: "404040" }}>Copied.</span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Tracklist;
