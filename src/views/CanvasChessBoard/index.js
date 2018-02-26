import React from 'react';
import { ID, defaultProps, propTypes } from './props';

const CanvasChessBoard = props => (
  <canvas id={props[ID]} />
);
CanvasChessBoard.defaultProps = defaultProps;
CanvasChessBoard.propTypes = propTypes;

export default CanvasChessBoard;
