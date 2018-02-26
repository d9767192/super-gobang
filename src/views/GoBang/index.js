import React from 'react';
import { ID, propTypes, defaultProps } from './props';

class ChessBoard extends React.Component {
  render() {
    return (
      <canvas id={this.props[ID]} />
    );
  }
}
ChessBoard.defaultProps = defaultProps;
ChessBoard.propTypes = propTypes;

export default ChessBoard;
