import React, { Component } from "react";
import Dropzone from "react-dropzone";
import xml2js from "xml2js";
import Tracklist from "./tracklist";
import DarkModeToggle from "./dark-toggle";
import TrackNoToggle from "./track-no-toggle";
import Clipboard from "./clipboard";
import Screenshot from "./screenshot";
import ColourPicker from "./colour-picker";
import About from "./about.js";

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

            if (extension === "nml") {

            const binaryStr = reader.result;
            const parser = new xml2js.Parser();
            parser.parseString(binaryStr);
            // extract collection metadata
            const result = parser.resultObject;

            const collection_entries = result["NML"]["COLLECTION"][0].ENTRY;

            // extract track metadata
            let collection_data = [];

            for (let step = 0; step < collection_entries.length; step++) {
              let location_info = collection_entries[step]["LOCATION"][0]["$"];

              collection_data.push({
                artist: collection_entries[step]["$"].ARTIST,
                track: collection_entries[step]["$"].TITLE,
                label: collection_entries[step]["INFO"][0]["$"].LABEL,
                location:
                  location_info.VOLUME + location_info.DIR + location_info.FILE
              });
            }

            // establish playlist type
            const playlist_type =
              result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0][
                "NODE"
              ][0]["PLAYLIST"][0].$.TYPE;

            // extract playlist metadata
            const playlist_entries =
              result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0][
                "NODE"
              ][0]["PLAYLIST"][0].ENTRY;

            let playlist_data = [];

            if (playlist_type === "PROTOCOL") {
              for (let step = 0; step < playlist_entries.length; step++) {
                playlist_data.push({
                  location: playlist_entries[step]["PRIMARYKEY"][0]["$"].KEY,
                  track_no: step,
                  played:
                    playlist_entries[step]["EXTENDEDDATA"][0]["$"].PLAYEDPUBLIC
                });
              }
            } else if (playlist_type === "LIST") {
              for (let step = 0; step < playlist_entries.length; step++) {
                playlist_data.push({
                  location: playlist_entries[step]["PRIMARYKEY"][0]["$"].KEY,
                  track_no: step,
                  played: "1"
                });
              }
            }

            // merge collection/playlist info
            let tracklist_data = [
              ...collection_data
                .concat(playlist_data)
                .reduce(
                  (m, o) =>
                    m.set(
                      o.location,
                      Object.assign(m.get(o.location) || {}, o)
                    ),
                  new Map()
                )
                .values()
            ];

            tracklist_data.sort(
              (a, b) => parseFloat(a.track_no) - parseFloat(b.track_no)
            );

            // remove tracks that weren't actually played
            let played_tracks = tracklist_data.filter(function(obj) {
              return obj.played === "1";
            });

            this.setState({
              track_data: played_tracks
            });
          }
         else if (extension === "txt") {

            const binaryStr = reader.result;

            let data_lines = binaryStr.split("\n");

            const data_formed = data_lines.map(index => {
              return index.split("\t");
            });

            const data_split = data_formed.filter(index => index.length === 11);

            data_split.shift();

            let tracks = [];

            for (let step = 0; step < data_split.length; step++) {
              tracks.push({
                artist: data_split[step][3],
                track: data_split[step][2],
                track_no: step
              });
            }

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
