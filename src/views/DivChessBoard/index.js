import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const DivChessBoard = (props) => {
  const {
    width,
    height,
    grid,
    style,
  } = props;
  const unitWidth = 100 / (grid + 1);
  const unitHeight = 100 / (grid + 1);
  return (
    <table
      className="div-chessboard-style"
      style={{ width, height, ...style }}
      width={width}
      height={height}
    >
      {
        Array.from({ length: grid }, () => (
          <tr
            className="chessboard-row"
            style={{ height: `${unitHeight}%` }}
          >
            {
              Array.from({ length: grid }, () => (
                <td
                  className="chessboard-col"
                  style={{ width: `${unitWidth}%` }}
                />
              ))
            }
          </tr>
        ))
      }
    </table>
  );
};
DivChessBoard.defaultProps = {
  grid: 15,
  style: {},
};
DivChessBoard.propTypes = {
  grid: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default DivChessBoard;
