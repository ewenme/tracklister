import React, { Component } from "react";
import Toggle from "react-toggle";

class TrackNoToggle extends Component {

  render() {
    return (
      <label>
        <Toggle
          id="track-no-status"
          defaultChecked={this.props.track_numbers}
          icons={false}
          onChange={this.props.toggleTrackNumbers}
        />
        <span className="label-text">track numbers</span>
      </label>
    );
  }
}

export default TrackNoToggle;
