export function setCoordinate() {
  const { width, ratio, grid } = this.props;
  if (typeof width !== 'number') {
    return false;
  }
  const coord = new Array(grid + 2);
  const trueWidth = Math.floor(width / 15) * 15;
  const trueHeight = Math.floor((trueWidth * ratio) / 15) * 15;
  const unitWidth = trueWidth / (grid + 1);
  const unitHeight = trueHeight / (grid + 1);
  for (let x = 0; x <= grid + 1; x += 1) {
    coord[x] = new Array(grid);
    for (let y = 0; y <= grid + 1; y += 1) {
      coord[x][y] = [unitWidth * x, unitHeight * y];
    }
  }
  return this.setState({ coord, width: trueWidth, height: trueHeight });
}

export default setCoordinate;
