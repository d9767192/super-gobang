const drawLine = (ctx, s, e) => {
  ctx.beginPath();
  ctx.moveTo(s[0], s[1]);
  ctx.lineTo(e[0], e[1]);
  ctx.closePath();
  ctx.stroke();
};
export const drawBoard = (canvas, props) => {
  const {
    grid,
    coord,
    width,
    ratio,
  } = props;
  const ctx = canvas.getContext('2d');
  const height = width * ratio;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i <= (grid + 1); i += 1) {
    drawLine(ctx, coord[0][i], coord[grid + 1][i]);
    drawLine(ctx, coord[i][0], coord[i][grid + 1]);
  }
};

export default drawBoard;
