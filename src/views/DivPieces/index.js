import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class DivPieces extends Component {
  static defaultProps = {
    chessMoves: [],
    detectChessMovesChange: () => {},
    detectWidthChange: () => {},
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    unitWidth: PropTypes.number.isRequired,
    coord: PropTypes.array.isRequired,
    chessMoves: PropTypes.array,
    detectChessMovesChange: PropTypes.func,
    detectWidthChange: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { children: [] };
  }
  componentWillReceiveProps(nextProps) {
    this.props.detectChessMovesChange.call(this, nextProps, this.props);
  }
  componentDidUpdate(prevProps) {
    this.props.detectWidthChange.call(this, prevProps, this.props);
  }
  render() {
    const { children } = this.state;
    const { width, height } = this.props;
    return (
      <div className="div-piece-style" style={{ width, height }}>
        <div
          width={width}
          height={height}
          target
          className="inner-wrapper"
        >
          {children}
        </div>
      </div>
    );
  }
}

export default DivPieces;
