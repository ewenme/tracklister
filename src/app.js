import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Tracklist from "./tracklist";
import TrackNoToggle from "./track-no-toggle";
import Clipboard from "./clipboard";
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
      <div className="container mx-auto h-screen">
        <div className="flex justify-center items-center">
          <div className="flex-grow">
          <h1 className="text-6xl"> tracklister </h1>
          </div>
        <div className="flex flex-row justify-end items-center space-x-4">
        <TrackNoToggle
            track_numbers={this.state.track_numbers}
            toggleTrackNumbers={this.toggleTrackNumbers.bind(this)}
          />
        <Clipboard track_data={track_data} track_numbers={track_numbers} />
        <About></About>
        </div>
        </div>
        <div className="flex h-full pt-4">
        <div className="flex-none p-2 border-2 border-black">
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
          <div className="flex-grow space-x-2 items-end">
          <Tracklist track_data={track_data} track_numbers={track_numbers} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
