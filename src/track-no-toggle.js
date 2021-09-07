import React from "react";
import Toggle from "react-toggle";

function TrackNoToggle(props) {

    return (
      <label>
        <Toggle
          id="track-no-status"
          defaultChecked={props.track_numbers}
          icons={false}
          onChange={props.toggleTrackNumbers}
        />
        <span className="label-text">track numbers</span>
      </label>
    );
}

export default TrackNoToggle;
