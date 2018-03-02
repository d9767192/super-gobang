import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DivChessBoard extends Component {
  static defaultProps = {
    drawBoard: () => {},
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    drawBoard: PropTypes.func,
  }
  render() {
    const { width, height } = this.props;
    const { children } = this.state;
    return (
      <div
        className="div-chessboard-style"
        width={width}
        height={height}
      >
        {children}
      </div>
    );
  }
}

export default DivChessBoard;
