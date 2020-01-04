import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import xml2js from 'xml2js'

// write function for reading/parsing .nml files
function readNML(file) {

  // init XML to JS parser
  const parser = new xml2js.Parser();
  
    // read/parse .nml history file
    parser.parseString(file, function (err, result) {
      
      // extract collection metadata
      const collection_entries = result["NML"]["COLLECTION"][0].ENTRY;
      
      // extract track metadata
      let collection_data = []

      for (let step = 0; step < collection_entries.length; step++) {

        let location_info = collection_entries[step]['LOCATION'][0]['$']

        collection_data.push({
          artist: collection_entries[step]['$'].ARTIST,
          track: collection_entries[step]['$'].TITLE,
          label: collection_entries[step]['INFO'][0]['$'].LABEL,
          location: location_info.VOLUME + location_info.DIR + location_info.FILE
        })
      }      
      
      // establish playlist type
      const playlist_type = result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0]["NODE"][0]["PLAYLIST"][0].$.TYPE;

      // extract playlist metadata
      const playlist_entries = result["NML"]["PLAYLISTS"][0]["NODE"][0]["SUBNODES"][0]["NODE"][0]["PLAYLIST"][0].ENTRY;

      let playlist_data = []

      if (playlist_type === "PROTOCOL") {

        for (let step = 0; step < playlist_entries.length; step++) {

          playlist_data.push({
            location: playlist_entries[step]['PRIMARYKEY'][0]['$'].KEY,
            track_no: step,
            played: playlist_entries[step]['EXTENDEDDATA'][0]['$'].PLAYEDPUBLIC
          })
        }
      
      } else if (playlist_type === "LIST") {

        for (let step = 0; step < playlist_entries.length; step++) {

          playlist_data.push({
            location: playlist_entries[step]['PRIMARYKEY'][0]['$'].KEY,
            track_no: step,
            played: '1'
          })
        }
      }

      // merge collection/playlist info
      let tracklist_data = [...collection_data.concat(playlist_data) 
        .reduce((m, o) => m.set(o.location, Object.assign(m.get(o.location) || {}, o)), 
        new Map()
      ).values()]; 
      
      tracklist_data.sort((a, b) => parseFloat(a.track_no) - parseFloat(b.track_no));

      // remove tracks that weren't actually played
      let played_tracks = tracklist_data.filter(function(obj) {
        return obj.played === '1';
    });

    console.log(played_tracks);
    return played_tracks
});
}

const Upload = () => {

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);

    acceptedFiles.forEach((file) => {

    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr);
        readNML(binaryStr);
      }
      reader.readAsText(file)
    })
  }, []);

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.nml',
    multiple: false,
    minSize: 0,
  });
  
  return (
    <div className="container text-center mt-5">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && "Drop it like it's hot!"}
      </div>
    </div>
  );
};

export default Upload;