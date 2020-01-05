import React, { Component } from 'react'

const TrackLayout = props => {
  const rows = props.trackData.map((row, index) => {
    return (
        <li key={index}>{row.artist} - {row.track} ({row.label})</li>
    )
  })

  return <ul style={{listStyleType:"none"}}>{rows}</ul>
}

class Tracklist extends Component {
    render() {
        const { trackData } = this.props

      return (
          <TrackLayout trackData={trackData} />
      )
    }
  }

export default Tracklist