import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Tracklist from "./tracklist";
import DarkModeToggle from "./dark-toggle";
import TrackNoToggle from "./track-no-toggle";
import Clipboard from "./clipboard";
import Screenshot from "./screenshot";
import ColourPicker from "./colour-picker";
import About from "./about.js";
import {parseNML, parseText} from "./file-parsers";

class App extends Component {
  state = {
    acceptedFiles: [],
    track_data: [],
    track_numbers: true
  };
  constructor() {
    super();
    this.onDrop = acceptedFiles => {
      acceptedFiles.forEach(file => {
        let extension = file.name
          .split(".")
          .pop()
          .toLowerCase();

          const reader = new FileReader();
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {

          const binaryStr = reader.result;

          if (extension === "nml") {
          let tracks = parseNML(binaryStr);
          this.setState({
            track_data: tracks
          });
        } else if (extension === "txt") {
            let tracks = parseText(binaryStr)
            this.setState({
              track_data: tracks
            });
          };
        }
          reader.readAsText(file);
      },
      this.setState({
        acceptedFiles: acceptedFiles
      }))
    }
  };
  

  toggleTrackNumbers() {
    this.setState({
      track_numbers: !this.state.track_numbers
    });
  }

  render() {
    const { track_data, track_numbers } = this.state;

    return (
      <div className="container">
        <div className="top-bar">
          <About></About>
          <Dropzone onDrop={this.onDrop} accept=".nml, .txt" multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "stop, drop!"
                  : "click here or drag a file to upload"}
              </div>
            )}
          </Dropzone>
        </div>
        <section>
          <Clipboard track_data={track_data} track_numbers={track_numbers} />
          <Screenshot></Screenshot>
          <DarkModeToggle />
          <ColourPicker />
          <TrackNoToggle
            track_numbers={this.state.track_numbers}
            toggleTrackNumbers={this.toggleTrackNumbers.bind(this)}
          />
        </section>

        <Tracklist track_data={track_data} track_numbers={track_numbers} />
      </div>
    );
  }
}

export default App;
