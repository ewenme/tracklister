import React from "react";

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

  const list_style = props.track_numbers ? "list-decimal" : "list-none";

  return <ol className={"list-inside " + list_style}>{rows}</ol>;
};

function Tracklist(props) {

    return (
      <div id="tracklist" className="text-right">
        <TrackLayout track_data={props.track_data} track_numbers={props.track_numbers} />
      </div>
    );
}

export default Tracklist;
