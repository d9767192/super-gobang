/* eslint react/no-did-mount-set-state: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class ResponsiveContainer extends Component {
  static defaultProps = {
    updateChildren: () => {},
    addScreenListener: () => {},
    removeScreenListener: () => {},
  }
  static propTypes = {
    updateChildren: PropTypes.func,
    addScreenListener: PropTypes.func,
    removeScreenListener: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { hanlder: undefined, children: null };
  }
  componentDidMount() {
    const hanlder = this.props.addScreenListener.call(this, this.container);
    this.setState({ hanlder });
  }
  componentWillReceiveProps(nextProps) {
    this.props.updateChildren.call(this, nextProps);
  }
  componentWillUnmount() {
    this.props.removeScreenListener(this.state.hanlder);
  }
  render() {
    const { children } = this.state;
    return (
      <div
        className="responsive-container-style"
        ref={(self) => { this.container = self; }}
      >
        {children}
      </div>
    );
  }
}

export default ResponsiveContainer;
