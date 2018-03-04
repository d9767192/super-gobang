import React from 'react';
import GoBangHost from '../../src';
import './style.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onFallBack = this.onFallBack.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.updated = this.updated.bind(this);
    this.state = { fallback: undefined };
  }
  onFallBack() {
    this.setState({ fallback: true });
  }
  onRestart() {
    this.setState({ restart: true });
  }
  updated() {
    this.setState({ fallback: false, restart: false });
  }
  render() {
    const { fallback, restart } = this.state;
    return (
      <div className="gobang-style">
        <div className="gobang-title">
          Gobang Game
        </div>
        <div className="gobang-area">
          <div className="inner-wrapper">
            <GoBangHost
              fallback={fallback}
              restart={restart}
              updated={this.updated}
              gameOver={(winner) => { alert(`${winner} Wins!`); }}
            />
          </div>
        </div>
        <div className="button-area">
          <button onClick={this.onFallBack}>Fallback</button>
          <button onClick={this.onRestart}>Restart</button>
        </div>
      </div>
    );
  }
}

export default App;
