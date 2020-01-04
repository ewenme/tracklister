import React, { Component } from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Artist</th>
          <th>Track</th>
        </tr>
      </thead>
    )
  }

const TableBody = props => {
  const rows = props.tracklist.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.artist}</td>
        <td>{row.track}</td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

class Table extends Component {
    render() {
        const { tracklist } = this.props

      return (
        <table>
          <TableHeader />
          <TableBody tracklist={tracklist} />
        </table>
      )
    }
  }

export default Table