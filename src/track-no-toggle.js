import Toggle from "react-toggle";

function TrackNoToggle(props) {

    return (
      <label className="flex flex-row">
        <Toggle
          id="track-no-status"
          defaultChecked={props.track_numbers}
          icons={false}
          onChange={props.toggleTrackNumbers}
        />
        <span className="pl-2">track numbers</span>
      </label>
    );
}

export default TrackNoToggle;
