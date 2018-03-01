/**
 * Calculate coordinates and set into state.
 */
export function setCoordinate() {
  const { width, ratio, grid } = this.props;
  if (typeof width !== 'number') {
    return false;
  }
  const coord = new Array(grid + 2);
  const unitWidth = Math.round(width / (grid + 1));
  const unitHeight = Math.round((width * ratio) / (grid + 1));
  const trueWidth = unitWidth * (grid + 1);
  const trueHeight = unitHeight * (grid + 1);
  for (let x = 0; x <= grid + 1; x += 1) {
    coord[x] = new Array(grid);
    for (let y = 0; y <= grid + 1; y += 1) {
      coord[x][y] = [unitWidth * x, unitHeight * y];
    }
  }
  return this.setState({
    coord,
    unitWidth,
    unitHeight,
    width: trueWidth,
    height: trueHeight,
  });
}
/**
 * Detect if the width of container is changed
 * @param {*} nextProps Next properties of the component
 * @param {*} props Current properties of the component
 */
export function detectWidthChanged(nextProps, props) {
  const { width: nextWidth } = nextProps;
  const { width } = props;
  if (nextWidth !== width) {
    setCoordinate.call(this);
  }
}

export default setCoordinate;
