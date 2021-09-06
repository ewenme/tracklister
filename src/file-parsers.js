import xml2js from "xml2js";

function parseNML(file) {

        const parser = new xml2js.Parser();
        parser.parseString(file);
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

        return played_tracks;
}

function parseText(file) {

  let data_lines = file.split("\n");

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

  return tracks;
}

export {parseNML, parseText}