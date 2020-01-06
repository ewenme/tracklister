import React, { Component } from "react";
import Tracklist from "./tracklist";
import Clipboard from "./clipboard";

class App extends Component {
  state = {
    tracks: [
      {
        artist: "Joy O",
        track: "Slipping",
        label: "Hinge Finger"
      },
      {
        artist: "Chance the Rapper",
        track: "Problems (feat. 2 Chainz)"
      },
      {
        artist: "Spooky",
        track: "Joyride",
        label: "Oil Gang"
      }
    ],
    track_numbers: true
  };

  toggleTrackNumbers = () => {
    this.setState(prevState => ({
      track_numbers: !prevState.track_numbers
    }));
  };

  render() {
    const { tracks, track_numbers } = this.state;

    return (
      <div className="container">
        <Tracklist
          trackData={tracks}
          trackNumber={track_numbers}
          toggleTrackNumbers={this.toggleTrackNumbers}
        />
        <Clipboard trackData={tracks} />
      </div>
    );
  }
}

export default App;
