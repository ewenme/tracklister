import React, { Component } from 'react'
import Table from './table'

class App extends Component {

  state = {
    tracklist: [
      {
        artist: "Joy O",
        track: "Burn",
        label: "Hinge Finger"
      },
      {
        artist: "Pearson Sound",
        track: "Starburst",
        label: "Hessle Audio"
      }
    ],
  }

  render() {

    const { tracklist } = this.state

    return (
      <div className="container">
    <Table tracklist={tracklist}/>
      </div>
    )
  }
}

export default App