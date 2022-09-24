import React from "react";

function About() {
    return (
            <div className="prose">
              {" "}
              <p>
              A simple app to turn .txt files exported from{" "}
              <a href="https://rekordbox.com/en/">Rekordbox</a> and .nml files
              exported from{" "}
              <a href="https://en.wikipedia.org/wiki/Traktor">Traktor</a> into
              tracklists.
              </p>
              <p>
              <a href="https://ewen6.typeform.com/to/meXt691B">Feedback welcome :]</a>
              </p>
              <p>
              <a href="https://github.com/ewenme/tracklister">Pull Requests also welcome !</a>
              </p>
              <h4>Rekordbox support</h4>
              <p>
              Any playlist can be exported from Rekordbox by right-clicking,
              selecting "Export a playlist to a file", then "Export a playlist
              to a file for KUVO (*.txt)". 
              N.B. history files can be
              exported in the same way — find them under the "Histories" tab
              inside the explorer pane.
              </p>
              <h4>Traktor support</h4>
              <p>
              Any playlist can be exported from Traktor by right-clicking, then
              selecting "Export Playlist", and ensuring "NML" filetype is
              active. Traktor also exports all sessions as .nml history files —
              see{" "}
              <a href="https://support.native-instruments.com/hc/en-us/articles/210274225-What-Files-and-Folders-does-TRAKTOR-Install-on-my-System-">
                this article
              </a>{" "}
              for more info.
              </p>
            </div>
    )
}

export default About;
