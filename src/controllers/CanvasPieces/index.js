import { radiusRatio, s, e } from './config';

const clearCanvas = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
};
const clearPiece = (ctx, coord, unitWidth) => {
  const cx = coord[0];
  const cy = coord[1];
  ctx.clearRect(cx - (unitWidth / 2), cy - (unitWidth / 2), unitWidth, unitWidth);
};
const drawPiece = (ctx, coord, unitWidth, color) => {
  const r = radiusRatio * (unitWidth / 2);
  const cx = coord[0];
  const cy = coord[1];
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(cx, cy, r, s, e);
  ctx.fill();
  ctx.closePath();
};
const addOrRemovePiece = (ctx, nextProps, props) => {
  const { chessMoves: nextChessMoves, unitWidth, coord } = nextProps;
  const { chessMoves } = props;
  if (chessMoves.length < nextChessMoves.length) {
    const { x, y, color } = nextChessMoves[nextChessMoves.length - 1];
    const point = coord[x][y];
    drawPiece(ctx, point, unitWidth, color);
  } else if (chessMoves.length > nextChessMoves.length) {
    const { x, y } = chessMoves[chessMoves.length - 1];
    const point = coord[x][y];
    clearPiece(ctx, point, unitWidth);
  }
};
const redrawPieces = (ctx, props) => {
  const {
    width,
    height,
    unitWidth,
    coord,
  } = props;
  const { chessMoves } = props;
  clearCanvas(ctx, width, height);
  chessMoves.forEach((element) => {
    const { x, y, color } = element;
    const point = coord[x][y];
    drawPiece(ctx, point, unitWidth, color);
  });
};
export const detectChessMovesChange = (container, nextProps, props) => {
  const ctx = container.getContext('2d');
  const { chessMoves } = props;
  const { chessMoves: nextChessMoves } = nextProps;
  if (chessMoves.length !== nextChessMoves.length) {
    addOrRemovePiece(ctx, nextProps, props);
  }
};
export const detectWidthChange = (container, prevProps, props) => {
  const ctx = container.getContext('2d');
  const { width } = props;
  const { width: nextWidth } = prevProps;
  if (nextWidth !== width) {
    redrawPieces(ctx, prevProps);
  }
};

export default detectChessMovesChange;
