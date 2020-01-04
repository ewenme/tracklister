import React, { Component } from 'react'
import Table from './table'
import Upload from './upload'

class App extends Component {

  state = {
    tracks: []
  }

  render() {

    const { tracks } = this.state

    return (
      <div className="container">
    <Upload />
    <Table tracklist={tracks} />
      </div>
    )
  }
}

export default App