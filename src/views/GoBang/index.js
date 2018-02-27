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
    this.setState({ chessMoves: [{ x: 1, y: 1, color: '#fefefe' }] });
  }
  onClear() {
    this.setState({ chessMoves: [] });
  }
  render() {
    return (
      <ResponsiveContainer>
        <button onClick={this.onClick}>Add</button>
        <button onClick={this.onClear}>Clear</button>
        <CanvasGoBang chessMoves={this.state.chessMoves} />
      </ResponsiveContainer>
    );
  }
}

export default GoBang;
