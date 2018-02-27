import React, { Component } from 'react';
import ResponsiveContainer from '../ResponsiveContainer';
import CanvasGoBang from '../CanvasGoBang';

class GoBang extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.state = { chessMoves: [] };
  }
  onClick() {
    this.setState({ chessMoves: [{ x: 1, y: 1, color: '#000000' }] });
  }
  onClear() {
    this.setState({ chessMoves: [] });
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Add</button>
        <button onClick={this.onClear}>Clear</button>
        <ResponsiveContainer>
          <CanvasGoBang chessMoves={this.state.chessMoves} />
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GoBang;
