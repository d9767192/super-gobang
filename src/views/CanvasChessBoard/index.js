import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getBoard from '../../hocs/getBoard';
import { drawBoard } from '../../controllers/CanvasChessBoard';

class CanvasChessBoard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }
  componentDidMount() {
    drawBoard(this.props);
  }
  render() {
    return (
      <canvas id={this.props.id} />
    );
  }
}

export default getBoard(CanvasChessBoard);
