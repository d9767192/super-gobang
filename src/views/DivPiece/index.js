import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const DivPiece = props => (
  <div
    className="div-piece-style"
    style={{
      top: props.y,
      left: props.x,
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
      backgroundColor: props.color,
    }}
  />
);
DivPiece.defaultProps = {
  size: 10,
  color: '#000000',
};
DivPiece.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default DivPiece;
