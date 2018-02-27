import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drawer } from '../../controllers/CanvasPieces';
import './style.less';

class CanvasPieces extends Component {
  static defaultProps = {
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    drawer(this.canvas, nextProps, this.props);
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
