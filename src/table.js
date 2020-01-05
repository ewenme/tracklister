import React, { Component } from 'react'

const Tracklist = props => {
  const rows = props.tracklist.map((row, index) => {
    return (
        <li key={index}>{row.artist} - {row.track} ({row.label})</li>
    )
  })

  return <ul style={{listStyleType:"none"}}>{rows}</ul>
}

class Table extends Component {
    render() {
        const { tracklist } = this.props

      return (
          <Tracklist tracklist={tracklist} />
      )
    }
  }

export default Table