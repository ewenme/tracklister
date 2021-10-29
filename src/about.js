import React from "react";
import Popup from "reactjs-popup";

function About() {
    return (
      <Popup
        trigger={
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" id="about">
            {" "}
            about / help{" "}
          </button>
        }
        modal
      >
        {close => (
          <div className="modal">
            <div className="prose lg:prose-xl">
            <h2> about / help </h2>
              {" "}
              <p>
              A simple app to turn .txt files exported from{" "}
              <a href="https://rekordbox.com/en/">Rekordbox</a> and .nml files
              exported from{" "}
              <a href="https://en.wikipedia.org/wiki/Traktor">Traktor</a> into
              beautiful tracklists. Built with{" "}
              <a href="https://reactjs.org/">React</a>. Made by{" "}
              <a href="https://twitter.com/ewen_">@ewen_</a>, source code on{" "}
              <a href="https://github.com/ewenme/tracklister">Github</a>.
              </p>
              <h4>Rekordbox support</h4>
              <p>
              Any playlist can be exported from Rekordbox by right-clicking,
              selecting "Export a playlist to a file", then "Export a playlist
              to a file for KUVO (*.txt)". Note that history files can be
              exported in the same way - find them under the "Histories" tab
              inside the explorer pane.
              </p>
              <h4>Traktor support</h4>
              <p>
              Any playlist can be exported from Traktor by right-clicking, then
              selecting "Export Playlist", and ensuring "NML" filetype is
              active. Traktor also exports all sessions as .nml history files -
              see{" "}
              <a href="https://support.native-instruments.com/hc/en-us/articles/210274225-What-Files-and-Folders-does-TRAKTOR-Install-on-my-System-">
                this article
              </a>{" "}
              for more info.
              </p>
            </div>
            <div className="flex flex-row justify-end">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => {
                  close();
                }}
              >
                close
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
}

export default About;
