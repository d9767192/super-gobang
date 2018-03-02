import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from '../../router/ResponsiveContainer';
import DGoBang from '../DivGoBang';
import CGoBang from '../CanvasGoBang';
import './style.less';

class GoBangHost extends Component {
  static defaultProps = {
    grid: 15,
    bColor: '#000000',
    wColor: '#e7e7eb',
    singleRace: false,
    fallback: false,
    restart: false,
    gameOver: () => {},
    updated: () => {},
    addClickEventListener: () => {},
    removeClickEventListener: () => {},
    receivePropsHandler: () => {},
    shouldUpdate: () => {},
    isCanvasSupported: () => true,
  }
  static propTypes = {
    grid: PropTypes.number,
    bColor: PropTypes.string,
    wColor: PropTypes.string,
    gameOver: PropTypes.func,
    updated: PropTypes.func,
    addClickEventListener: PropTypes.func,
    removeClickEventListener: PropTypes.func,
    receivePropsHandler: PropTypes.func,
    shouldUpdate: PropTypes.func,
    isCanvasSupported: PropTypes.func,
    singleRace: PropTypes.bool,
    fallback: PropTypes.bool,
    restart: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = { chessMoves: [], WrappedComponent: undefined };
  }
  componentWillMount() {
    this.props.addClickEventListener.call(this, this.props);
    const supportCanvas = this.props.isCanvasSupported();
    const WrappedComponent = supportCanvas ? CGoBang : DGoBang;
    this.setState({ WrappedComponent });
  }
  componentWillReceiveProps(nextProps) {
    this.props.receivePropsHandler.call(this, nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.shouldUpdate(nextState, this.state);
  }
  componentDidUpdate() {
    this.props.updated();
  }
  componentWillUnmount() {
    this.props.removeClickEventListener.call(this);
  }
  render() {
    const { chessMoves, WrappedComponent } = this.state;
    const { grid } = this.props;
    return (
      <div className="gobang-host-style">
        <ResponsiveContainer>
          <WrappedComponent grid={grid} chessMoves={chessMoves} />
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GoBangHost;
