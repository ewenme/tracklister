import React, { Component } from "react";
import domtoimage from "dom-to-image";
import filesaver from "file-saver";

class Screenshot extends Component {
  printDocument() {
    const input = document.getElementById("tracklist");

    domtoimage.toBlob(input).then(function(blob) {
      filesaver.saveAs(blob, "my-tracklist.png");
    });
  }

  render() {
    return (
      <React.Fragment>
        <button className="muted-button" onClick={this.printDocument}>
          take a screenshot
        </button>
      </React.Fragment>
    );
  }
}

export default Screenshot;
