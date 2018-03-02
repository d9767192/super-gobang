import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const DivChessBoard = (props) => {
  const {
    width,
    height,
    grid,
    style,
    unitHeight,
  } = props;
  return (
    <div
      className="div-chessboard-style"
      style={{ width, height, ...style }}
    >
      {
        Array.from({ length: (grid + 1) }, (v, i) => (
          <div key={`${i}-board`} className="chessboard-row" style={{ height: unitHeight }}>
            {
              Array.from({ length: (grid + 1) }, (d, j) => (
                <div key={`${i}-${j}-board`} className="chessboard-col" />
              ))
            }
          </div>
        ))
      }
    </div>
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
  unitHeight: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default DivChessBoard;
