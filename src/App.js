import React, { Component } from 'react'
import Table from './tracklist'

class App extends Component {

  state = {
    tracks: [
      {
        artist: "me",
        track: "you"
      }
    ],
  }

  render() {

    const { tracks } = this.state

    return (
      <div className="container">
    <Table trackData={tracks}/>
      </div>
    )
  }
}

export default App