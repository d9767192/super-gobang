import React from 'react';
import CanvasChessBoard from '../CanvasChessBoard';
import ResponsiveContainer from '../ResponsiveContainer';

class GoBang extends React.Component {
  render() {
    return (
      <ResponsiveContainer>
        <CanvasChessBoard />
      </ResponsiveContainer>
    );
  }
}

export default GoBang;
