import React from 'react';

export default class Laps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let laps = [];

    this.props.laps.forEach((lap, index) => {
      laps.push(
        <tr key={ index }>
          <td>{ index + 1 }</td>
          <td>{ lap }</td>
        </tr>
      )
    });

    return (
      <table id="laps" className="table">
        <thead>
          <tr>
            <th>Lap</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          { laps.reverse() }
        </tbody>
      </table>
    );
  }
}
