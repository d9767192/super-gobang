import React from 'react';
import DivPiece from '../../views/DivPiece';
import { radiusRatio } from './config';

/**
 * Clear all content on chessboard
 * @param {array} children The children of component
 * @param {number} s Start point to be sliced
 * @param {number} e End point to be sliced
 * @returns {array} Updated children
 */
export function clearPiece(children, s, e) {
  const nextChildren = children.slice(s, e);
  return nextChildren;
}
/**
 * Draw piece on chessboard
 * @param {array} children The children of component
 * @param {array} coord The coordinate of piece
 * @param {number} unitWidth Unit width per grid
 * @param {string} color The color of piece
 * @returns {array} Updated children
 */
export const drawPiece = (children, coord, unitWidth, color) => {
  const size = radiusRatio * unitWidth;
  const x = (coord[0] - (size / 2)) + 1;
  const y = (coord[1] - (size / 2)) + 1;
  const key = `${x}-${y}-piece`;
  const piece = <DivPiece key={key} x={x} y={y} color={color} size={size} />;
  children.push(piece);
  return children;
};
/**
 * Rerender pieces on chessboard
 * @param {*} props The properties of the component
 */
export function redrawPieces(props) {
  const { unitWidth, coord, chessMoves } = props;
  const children = [];
  chessMoves.forEach((element) => {
    const { x, y, color } = element;
    const point = coord[x][y];
    drawPiece(children, point, unitWidth, color);
  });
  this.setState({ children });
}
/**
 * Add or remove piece on chessboard
 * @param {*} nextProps Next properties of the component
 * @param {*} props Current properties of the component
 */
export function addOrRemovePiece(nextProps, props) {
  const { chessMoves: nextChessMoves, unitWidth, coord } = nextProps;
  const { chessMoves } = props;
  const { children } = this.state;
  let nextChildren;
  if (chessMoves.length < nextChessMoves.length) {
    const { x, y, color } = nextChessMoves[nextChessMoves.length - 1];
    const point = coord[x][y];
    nextChildren = drawPiece(children, point, unitWidth, color);
  } else if (chessMoves.length > nextChessMoves.length) {
    const e = nextChessMoves.length - chessMoves.length;
    nextChildren = clearPiece(children, 0, e);
  }
  this.setState({ children: nextChildren.slice() });
}
/**
 * Detect if the chess moves
 * @param {object} nextProps Next properties of the component
 * @param {object} props Current properties of the component
 */
export function detectChessMovesChange(nextProps, props) {
  const { chessMoves: nextChessMoves } = nextProps;
  const { chessMoves } = props;
  if (nextChessMoves.length !== chessMoves.length) {
    addOrRemovePiece.call(this, nextProps, props);
  }
}
/**
 * Detect if the width of container is changed
 * @param {object} prevProps The previous properties of the component
 * @param {object} props Current properties of the component
 */
export function detectWidthChange(prevProps, props) {
  const { width } = props;
  const { width: prevWidth } = prevProps;
  if (prevWidth !== width) {
    redrawPieces.call(this, props);
  }
}

export default detectChessMovesChange;
