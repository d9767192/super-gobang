import React from 'react';
import DivChessBoard from '../../src/views/DivChessBoard';
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
      <div>
        <button onClick={this.onFallBack}>Fallback</button>
        <button onClick={this.onRestart}>Restart</button>
        <DivChessBoard
          width={400}
          height={400}
        />
      </div>
    );
  }
}

export default App;
