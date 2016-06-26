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
      milliseconds: '000'
    };

    this.laps = [];
    this.key = 0;
    this.state = this.initialState;
  }

  tick = () => {
    let delta = Date.now() - this.state.startTime;

    this.setState({ elapsedTime: this.state.elapsedTime + delta });
    this.state.startTime = Date.now();

    let seconds = this.state.elapsedTime / 1000;

    this.setState({
      startTime: Date.now(),
      minutes: Math.floor(seconds / 60).toString(),
      seconds: Math.floor(seconds % 60).toString(),
      milliseconds: (seconds % 1).toFixed(3).substring(2)
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
    this.interval = setInterval(this.tick, 10);
  }

  stop = () => {
    this.setState({ isRunning: false });
    clearInterval(this.interval);
  }

  lap = () => {
    this.laps.push(this.time());
  }

  reset = () => {
    this.setState(this.initialState);
    clearInterval(this.interval);
    this.laps = [];
    this.key = Date.now();
  }

  render() {
    return (
      <div id="main" key={ this.key }>
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
        <Laps key={ this.key } laps={ this.laps } />
      </div>
    );
  }
}
