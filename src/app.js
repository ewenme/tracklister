import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Tracklist from "./tracklist";
import TrackNoToggle from "./track-no-toggle";
import Clipboard from "./clipboard";
import {parseTraktor, parseRekordbox} from "./file-parsers";

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
          let tracks = parseTraktor(binaryStr);
          this.setState({
            track_data: tracks
          });
        } else if (extension === "txt") {
            let tracks = parseRekordbox(binaryStr)
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
      <div className="container flex p-4">
        <div className="flex-col flex-grow">
          <div className="flex flex-row items-center space-x-4 pb-10">
        <TrackNoToggle
            track_numbers={this.state.track_numbers}
            toggleTrackNumbers={this.toggleTrackNumbers.bind(this)}
          />
        <Clipboard track_data={track_data} track_numbers={track_numbers} />
        </div>
          <div className="space-x-2">
          <Tracklist track_data={track_data} track_numbers={track_numbers} />
          </div>
        </div>
          <div className="p-4 border-4">
          <Dropzone onDrop={this.onDrop} accept=".nml, .txt" multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div className="flex h-full" {...getRootProps({})}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "click here or drag a file to upload"
                  : "click here or drag a file to upload"}
              </div>
            )}
          </Dropzone>
          </div>
      </div>
    );
  }
}

export default App;
