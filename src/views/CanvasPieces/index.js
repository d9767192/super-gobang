import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { detectChessMovesChange, detectWidthChange } from '../../controllers/CanvasPieces';
import './style.less';

class CanvasPieces extends Component {
  static defaultProps = {
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    detectChessMovesChange(this.canvas, nextProps, this.props);
  }
  componentDidUpdate(prevProps) {
    detectWidthChange(this.canvas, this.props, prevProps);
  }
  render() {
    const { width, height } = this.props;
    return (
      <canvas
        ref={(self) => { this.canvas = self; }}
        width={width}
        height={height}
        className="canvas-pieces-style"
      />
    );
  }
}

export default CanvasPieces;
