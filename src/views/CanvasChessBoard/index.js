import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drawBoard } from '../../controllers/CanvasChessBoard';
import './style.less';

class CanvasChessBoard extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }
  componentDidMount() {
    drawBoard(this.chessboard, this.props);
  }
  componentDidUpdate() {
    drawBoard(this.chessboard, this.props);
  }
  render() {
    const { width, height } = this.props;
    return (
      <canvas
        width={width}
        height={height}
        ref={(self) => { this.chessboard = self; }}
        className="canvas-chessboard-style"
      />
    );
  }
}

export default CanvasChessBoard;
