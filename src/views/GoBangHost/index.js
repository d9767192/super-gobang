import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from '../ResponsiveContainer';
import CanvasGoBang from '../CanvasGoBang';
import {
  addClickEventListener,
  removeClickEventListener,
  receivePropsHandler,
  shouldUpdate,
} from '../../controllers/GoBangHost';
import './style.less';

class GoBangHost extends Component {
  static defaultProps = {
    grid: 15,
    bColor: '#000000',
    wColor: '#e7e7eb',
    gameOver: () => {},
    updated: () => {},
    singleRace: false,
    fallback: false,
    restart: false,
  }
  static propTypes = {
    grid: PropTypes.number,
    bColor: PropTypes.string,
    wColor: PropTypes.string,
    gameOver: PropTypes.func,
    updated: PropTypes.func,
    singleRace: PropTypes.bool,
    fallback: PropTypes.bool,
    restart: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = { chessMoves: [] };
  }
  componentWillMount() {
    addClickEventListener.call(this, this.props);
  }
  componentWillReceiveProps(nextProps) {
    receivePropsHandler.call(this, nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shouldUpdate(nextState, this.state);
  }
  componentDidUpdate() {
    this.props.updated();
  }
  componentWillUnmount() {
    removeClickEventListener.call(this);
  }
  render() {
    const { chessMoves } = this.state;
    const { grid } = this.props;
    return (
      <div className="gobang-host-style">
        <ResponsiveContainer>
          <CanvasGoBang grid={grid} chessMoves={chessMoves} />
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GoBangHost;
