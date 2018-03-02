import { chainNum, black, white, deadlock } from './config';

/**
 * Check if the point of piece is in boundary of grid
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {number} grid The grid number of gobang
 * @returns {boolean} Checked result
 */
export const isInBoundOfBoard = (x, y, grid) => x > 0 && x <= grid && y > 0 && y <= grid;
/**
 * Update chess moves
 * @param {array} chessMoves Array of the recordings of chess moves
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {object} props The properties of the component
 * @returns {object} Updated chess moves array, current player name and its color
 */
export const updateChessMoves = (chessMoves, x, y, props) => {
  const { wColor, bColor } = props;
  const nextChessMoves = chessMoves.slice();
  const color = (nextChessMoves.length + 1) % 2 === 0 ? wColor : bColor;
  const player = color === bColor ? black : white;
  nextChessMoves.push({ x, y, color });
  return { nextChessMoves, player, color };
};
/**
 * Translate screen XY coordinates into chessboard XY coordinates
 * @param {element} target The target element of chess pieces
 * @param {number} posX The X screen coordinates
 * @param {number} posY The Y screen coordinates
 * @param {number} grid The grid number of gobang
 * @returns {object} The chessboard XY coordinates
 */
export const calculateXY = (target, posX, posY, grid) => {
  const width = target.getAttribute('width');
  const height = target.getAttribute('height');
  const x = Math.floor(Math.round((posX / width) * (grid + 1)));
  const y = Math.floor(Math.round((posY / height) * (grid + 1)));
  return { x, y };
};
/**
 * Check if the point exists in recordings of chess moves
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {array} chessMoves Array of the recordings of chess moves
 * @param {function} otherConditions Other conditions which want to be added in judgement
 * @returns {boolean} The checking result
 */
export const pointExisted = (x, y, chessMoves, otherConditions = () => true) => {
  const point = chessMoves.find(item => item.x === x && item.y === y && otherConditions(item));
  return point !== undefined;
};
/**
 * Calculate all win conditions
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {number} grid The grid number of gobang
 * @returns {array} All conditions the player could win
 */
export const getWinConditions = (x, y, grid) => {
  const yLowerBound = (y - chainNum) + 1;
  const yUpperBound = (y + chainNum) - 1;
  const xLowerBound = (x - chainNum) + 1;
  const xUPperBound = (x + chainNum) - 1;
  const T = yLowerBound > 0 ?
    Array.from({ length: chainNum }, (item, idx) => [x, y - idx]) :
    undefined;
  const TR = xUPperBound <= grid && yLowerBound > 0 ?
    Array.from({ length: chainNum }, (item, idx) => [x + idx, y - idx]) :
    undefined;
  const R = xUPperBound <= grid ?
    Array.from({ length: chainNum }, (item, idx) => [x + idx, y]) :
    undefined;
  const RB = xUPperBound <= grid && yUpperBound <= grid ?
    Array.from({ length: chainNum }, (item, idx) => [x + idx, y + idx]) :
    undefined;
  const B = yUpperBound <= grid ?
    Array.from({ length: chainNum }, (item, idx) => [x, y + idx]) :
    undefined;
  const LB = xLowerBound > 0 && yUpperBound <= grid ?
    Array.from({ length: chainNum }, (item, idx) => [x - idx, y + idx]) :
    undefined;
  const L = xLowerBound > 0 ?
    Array.from({ length: chainNum }, (item, idx) => [x - idx, y]) :
    undefined;
  const LT = xLowerBound > 0 && yLowerBound > 0 ?
    Array.from({ length: chainNum }, (item, idx) => [x - idx, y - idx]) :
    undefined;
  let result = [T, TR, R, RB, B, LB, L, LT];
  result = result.filter(item => item !== undefined);
  return result;
};
/**
 * Check if the player wins
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {string} color The color of current piece
 * @param {number} grid The grid number of gobang
 * @param {array} chessMoves Array of the recordings of chess moves
 * @returns {boolean} The result if the player wins
 */
export function checkWin(x, y, color, grid, chessMoves) {
  if (chessMoves.length < 9) {
    return false;
  }
  const conditions = getWinConditions(x, y, grid);
  const result = conditions.some(condition => (
    condition.every(point => (
      pointExisted(point[0], point[1], chessMoves, item => item.color === color)
    ))
  ));
  return result;
}
/**
 * Whether game is over
 * @param {array} chessMoves Array of the recordings of chess moves
 * @param {number} x The x coordinate of piece
 * @param {number} y The y coordinate of piece
 * @param {string} color The color of current piece
 * @param {string} player The current player
 * @param {object} props The properties of the component
 * @returns {boolean} If true, the game is over.
 */
export const isGameOver = (chessMoves, x, y, color, player, props) => {
  const { gameOver, grid } = props;
  const result = checkWin(x, y, color, grid, chessMoves);
  if (result) {
    gameOver(player);
  } else if (chessMoves.length === grid * grid) {
    gameOver(deadlock);
  }
  return result;
};
/**
 * Update chess moves if point is valid
 * @param {*} x The x coordinate of piece
 * @param {*} y The y coordinate of piece
 * @param {*} chessMoves Array of the recordings of chess moves
 * @param {*} props The properties of the component
 */
export function updateIfPointIsValid(x, y, chessMoves, props) {
  const { grid } = props;
  if (isInBoundOfBoard(x, y, grid) && !pointExisted(x, y, chessMoves)) {
    const { nextChessMoves, player, color } = updateChessMoves(chessMoves, x, y, props);
    const nextLocked = isGameOver(nextChessMoves, x, y, color, player, props);
    this.setState({ chessMoves: nextChessMoves, locked: nextLocked });
  }
}
/**
 * Add piece on to the chessboard and check if the player wins or deadlocks
 * @param {*} props The properties of the component
 */
export function addPiece(props) {
  return (
    function listener(e) {
      const { grid } = props;
      const { target, offsetX, offsetY } = e;
      const isTarget = target.getAttribute('target');
      const { chessMoves, locked } = this.state;
      if (isTarget && !locked) {
        const { x, y } = calculateXY(target, offsetX, offsetY, grid);
        updateIfPointIsValid.call(this, x, y, chessMoves, props);
      }
    }
  );
}
/**
 * Fallback the piece
 * @param {*} props The properties of the component
 */
export function fallbackPieces(props) {
  const { singleRace } = props;
  const { chessMoves, locked } = this.state;
  const { length } = chessMoves;
  if (!locked) {
    let clonedChessMoves = chessMoves.slice();
    if (singleRace) {
      clonedChessMoves = clonedChessMoves.slice(0, length - 2);
    } else {
      clonedChessMoves = clonedChessMoves.slice(0, length - 1);
    }
    this.setState({ chessMoves: clonedChessMoves });
  }
}
/**
 * Restart the game
 */
export function restartGame() {
  this.setState({ chessMoves: [], locked: false });
}
/**
 * Add click event onto the chessboard
 * @param {*} props The propertis of the component
 */
export function addClickEventListener(props) {
  let listener = addPiece(props);
  listener = listener.bind(this);
  window.addEventListener('click', listener);
  this.setState({ listener });
}
/**
 * Remove click event from chessboard
 */
export function removeClickEventListener() {
  window.removeEventListener('click', this.state.listener);
}
/**
 * Check if fallback or restart is triggered
 * @param {*} nextProps The next properties of the component
 */
export function receivePropsHandler(nextProps) {
  const { fallback, restart } = nextProps;
  if (fallback === true) {
    fallbackPieces.call(this, nextProps);
  }
  if (restart === true) {
    restartGame.call(this);
  }
}
/**
 * Check if the component should be rerendered
 * @param {*} nextState The next state of the component
 * @param {*} state The current state of the component
 */
export const shouldUpdate = (nextState, state) => {
  const { chessMoves: nextChessMoves } = nextState;
  const { chessMoves } = state;
  return nextChessMoves !== chessMoves;
};

export default addClickEventListener;
