import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class CanvasChessBoard extends Component {
  static defaultProps = {
    grid: 15,
    drawBoard: () => {},
  }
  static propTypes = {
    grid: PropTypes.number,
    coord: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    drawBoard: PropTypes.func,
  }
  componentDidMount() {
    this.props.drawBoard(this.chessboard);
  }
  componentDidUpdate() {
    this.props.drawBoard(this.chessboard);
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
