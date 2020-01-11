import React, { Component } from "react";

class TrackNoToggle extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      track_numbers: this.props.track_numbers
    };
  }

  render() {
    return (
      <button class="square-button" onClick={this.props.toggleTrackNumbers}>
        Toggle track numbers
      </button>
    );
  }
}

export default TrackNoToggle;
