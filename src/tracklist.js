import React, { Component } from 'react'

const TrackLayout = props => {
  const rows = props.trackData.map((row, index) => {
    return (
        <li key={index}>
          {row.artist} - {row.track} {row.label}
          </li>
    )
  })

  const list_style = (props.trackNumber) ? "decimal" : "none"

  return <ol style={{listStyleType:list_style}}>{rows}
   <button onClick={() => props.toggleTrackNumbers()}>Toggle track numbers</button>
   </ol>
}

class Tracklist extends Component {
    render() {
        const { trackData, trackNumber, toggleTrackNumbers } = this.props

      return (
          <TrackLayout 
          trackData={trackData} trackNumber={trackNumber} 
          toggleTrackNumbers={toggleTrackNumbers}
          />
      )
    }
  }

export default Tracklist