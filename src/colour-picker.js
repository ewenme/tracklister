import React, { Component } from "react";
import { CompactPicker } from "react-color";

class ColourPicker extends Component {
  handleChangeComplete = (colour, event) => {
    document.body.style.backgroundColor = colour.hex;
  };

  render() {
    return <CompactPicker onChangeComplete={this.handleChangeComplete} />;
  }
}

export default ColourPicker;
