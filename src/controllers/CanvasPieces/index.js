import { radiusRatio, s, e } from './config';

/**
 * Clear all content on chessboard
 * @param {*} ctx Context of the canvas
 * @param {number} width The width of the chessboard
 * @param {number} height The height of the chessboard
 */
export const clearCanvas = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
};
/**
 * Clear piece on chessboard
 * @param {*} ctx Context of the canvas
 * @param {array} coord The coordinate of piece
 * @param {number} unitWidth Unit width per grid
 */
export const clearPiece = (ctx, coord, unitWidth) => {
  const cx = coord[0];
  const cy = coord[1];
  ctx.clearRect(cx - (unitWidth / 2), cy - (unitWidth / 2), unitWidth, unitWidth);
};
/**
 * Draw piece on chessboard
 * @param {*} ctx Context of the canvas
 * @param {array} coord The coordinate of piece
 * @param {number} unitWidth Unit width per grid
 * @param {string} color The color of piece
 */
export const drawPiece = (ctx, coord, unitWidth, color) => {
  const r = radiusRatio * (unitWidth / 2);
  const cx = coord[0];
  const cy = coord[1];
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(cx, cy, r, s, e);
  ctx.fill();
  ctx.closePath();
};
/**
 * Add or remove piece on chessboard
 * @param {*} ctx Context of the canvas
 * @param {object} nextProps Next properties of the component
 * @param {object} props Current properties of the component
 */
export const addOrRemovePiece = (ctx, nextProps, props) => {
  const { chessMoves: nextChessMoves, unitWidth, coord } = nextProps;
  const { chessMoves } = props;
  if (chessMoves.length < nextChessMoves.length) {
    const { x, y, color } = nextChessMoves[nextChessMoves.length - 1];
    const point = coord[x][y];
    drawPiece(ctx, point, unitWidth, color);
  } else if (chessMoves.length > nextChessMoves.length) {
    const pieces = chessMoves.slice(nextChessMoves.length, chessMoves.length);
    pieces.forEach((piece) => {
      const { x, y } = piece;
      const point = coord[x][y];
      clearPiece(ctx, point, unitWidth);
    });
  }
};
/**
 * Rerender pieces on chessboard
 * @param {*} ctx Context of the canvas
 * @param {*} props The properties of the component
 */
export const redrawPieces = (ctx, props) => {
  const {
    width,
    height,
    unitWidth,
    coord,
    chessMoves,
  } = props;
  clearCanvas(ctx, width, height);
  chessMoves.forEach((element) => {
    const { x, y, color } = element;
    const point = coord[x][y];
    drawPiece(ctx, point, unitWidth, color);
  });
};
/**
 * Detect if the chess moves
 * @param {element} container The element of the canvas
 * @param {object} nextProps Next properties of the component
 * @param {*} props Current properties of the component
 */
export const detectChessMovesChange = (container, nextProps, props) => {
  const ctx = container.getContext('2d');
  const { chessMoves } = props;
  const { chessMoves: nextChessMoves } = nextProps;
  if (chessMoves.length !== nextChessMoves.length) {
    addOrRemovePiece(ctx, nextProps, props);
  }
};
/**
 * Detect if the width of container is changed
 * @param {*} container The element of the canvas
 * @param {*} prevProps The previous properties of the component
 * @param {*} props Current properties of the component.
 */
export const detectWidthChange = (container, prevProps, props) => {
  const ctx = container.getContext('2d');
  const { width } = props;
  const { width: prevWidth } = prevProps;
  if (prevWidth !== width) {
    redrawPieces(ctx, prevProps);
  }
};

export default detectChessMovesChange;
