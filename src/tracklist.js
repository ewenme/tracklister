import React, { Component } from "react";

const TrackLayout = props => {
  const rows = props.track_data.map((row, index) => {
    return (
      <li key={index}>
        <span className="track-artist">
          <b>{row.artist}</b>{" "}
        </span>
        <br />
        <span className="track-title">
          <small>{row.track}</small>
        </span>
      </li>
    );
  });

  const list_style = props.track_numbers ? "decimal" : "none";

  return <ol style={{ listStyleType: list_style }}>{rows}</ol>;
};

class Tracklist extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      track_data: this.props.track_data,
      copied: false
    };

    this.state = this.initialState;
  }
  render() {
    const { track_data, track_numbers } = this.props;

    return (
      <div id="tracklist">
        <TrackLayout track_data={track_data} track_numbers={track_numbers} />
      </div>
    );
  }
}

export default Tracklist;
