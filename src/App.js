import React, { Component } from "react";
import Dropzone from "react-dropzone";
import xml2js from "xml2js";
import Tracklist from "./tracklist";
import DarkModeToggle from "./dark-toggle";

class App extends Component {
  state = {
    acceptedFiles: [],
    tracks: [],
    track_numbers: true
  };
  constructor() {
    super();
    this.onDrop = acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
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
            result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0]["NODE"][0][
              "PLAYLIST"
            ][0].$.TYPE;

          // extract playlist metadata
          const playlist_entries =
            result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0]["NODE"][0][
              "PLAYLIST"
            ][0].ENTRY;

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
                  m.set(o.location, Object.assign(m.get(o.location) || {}, o)),
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
            tracks: played_tracks
          });
        };
        reader.readAsBinaryString(file);
      });
      this.setState({
        acceptedFiles: acceptedFiles
      });
    };
  }

  toggleTrackNumbers = () => {
    this.setState(prevState => ({
      track_numbers: !prevState.track_numbers
    }));
  };

  render() {
    const { tracks, track_numbers } = this.state;

    return (
      <div className="container">
        <DarkModeToggle />
        <Dropzone onDrop={this.onDrop} accept=".nml" multiple={false}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "stop, drop!"
                  : "click here or drag a file to upload"}
              </div>
            </section>
          )}
        </Dropzone>
        <Tracklist
          trackData={tracks}
          trackNumber={track_numbers}
          toggleTrackNumbers={this.toggleTrackNumbers}
        />
      </div>
    );
  }
}

export default App;
