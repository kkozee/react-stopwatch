import React from 'react';
import Laps from './Laps.jsx';

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      startTime: Date.now(),
      elapsedTime: 0,
      isRunning: false,
      minutes: '00',
      seconds: '00',
      milliseconds: '00'
    };

    this.laps = [];
    this.state = this.initialState;
  }

  tick = () => {
    this.setState({
      elapsedTime: this.state.elapsedTime + (Date.now() - this.state.startTime),
      startTime: Date.now()
    });

    let seconds = this.state.elapsedTime / 1000;

    this.setState({
      startTime: Date.now(),
      minutes: Math.floor(seconds / 60).toString(),
      seconds: Math.floor(seconds % 60).toString(),
      milliseconds: (seconds % 1).toFixed(2).substring(2)
    });
  }

  time = () => {
    let elapsedTime = '';

    elapsedTime = this.state.minutes.length === 1 ? '0' + this.state.minutes : this.state.minutes;
    elapsedTime += ':';
    elapsedTime += this.state.seconds.length === 1 ? '0' + this.state.seconds : this.state.seconds;
    elapsedTime += '.';
    elapsedTime += this.state.milliseconds;

    return elapsedTime;
  }

  start = () => {
    this.setState({ isRunning: true });
    this.state.startTime = Date.now();
    this.interval = setInterval(this.tick, 200);
  }

  stop = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  }

  lap = () => {
    this.laps.push(this.time());
  }

  reset = () => {
    clearInterval(this.interval);
    this.setState(this.initialState);
    this.laps = [];
  }

  render() {
    return (
      <div id="main">
        <div className="elapsed-time">
          { this.time() }
        </div>
        <div className="buttons">
          <button onClick={ this.state.isRunning ? this.stop : this.start } className="btn btn-lg btn-primary-outline">
            { this.state.isRunning ? 'Stop' : 'Start' }
          </button>
          <button onClick={ this.state.isRunning ? this.lap : this.reset } className="btn btn-lg btn-primary-outline">
            { this.state.isRunning ? 'Lap' : 'Reset' }
          </button>
        </div>
        <Laps laps={ this.laps } />
      </div>
    );
  }
}
