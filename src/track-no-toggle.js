import React, { Component } from "react";
import Toggle from "react-toggle";

class TrackNoToggle extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      track_numbers: this.props.track_numbers
    };
  }

  render() {
    return (
      <React.Fragment>
        <Toggle
          id="track-no-status"
          defaultChecked={this.props.track_numbers}
          icons={false}
          onChange={this.props.toggleTrackNumbers}
        />
        <label htmlFor="track-no-status">Track numbers</label>
      </React.Fragment>
    );
  }
}

export default TrackNoToggle;
