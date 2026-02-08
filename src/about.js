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
              <h4>Rekordbox support</h4>
              <p>
              To export a playlist or history file from Rekordbox, right-click it and
              select "Export a playlist to a file" → "Export a playlist to a
              file for KUVO (*.txt)".
              </p>
              <h4>Traktor support</h4>
              <p>
              To export a playlist from Traktor, right-click it, select
              "Export Playlist", and ensure the filetype is set to "NML".
              Traktor saves all sessions as .nml history files —{" "}
              <a href="https://support.native-instruments.com/hc/en-us/articles/210274225-What-Files-and-Folders-does-TRAKTOR-Install-on-my-System-">
                learn more here
              </a>
              .
              </p>
              <p>
              Made by <a href="https://ewen.io">ewen</a>. <a href="https://github.com/ewenme/tracklister">View source</a>.
              </p>
            </div>
    )
}

export default About;
