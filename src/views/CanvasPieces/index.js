import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class CanvasPieces extends Component {
  static defaultProps = {
    detectChessMovesChange: () => {},
    detectWidthChange: () => {},
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    detectChessMovesChange: PropTypes.func,
    detectWidthChange: PropTypes.func,
  }
  componentWillReceiveProps(nextProps) {
    this.props.detectChessMovesChange(this.canvas, nextProps);
  }
  componentDidUpdate(prevProps) {
    this.props.detectWidthChange(this.canvas, prevProps);
  }
  render() {
    const { width, height } = this.props;
    return (
      <canvas
        target
        ref={(self) => { this.canvas = self; }}
        width={width}
        height={height}
        className="canvas-pieces-style"
      />
    );
  }
}

export default CanvasPieces;
