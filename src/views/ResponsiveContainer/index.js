/* eslint react/no-did-mount-set-state: off */

import React, { Component } from 'react';
import { addScreenListener, removeScreenListener, updateChildren } from '../../controllers/ResponsiveContainer';
import './style.less';

class ResponsiveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { hanlder: undefined, children: null };
  }
  componentDidMount() {
    const hanlder = addScreenListener.call(this, this.container);
    this.setState({ hanlder });
  }
  componentWillReceiveProps(nextProps) {
    updateChildren.call(this, nextProps);
  }
  componentWillUnmount() {
    removeScreenListener(this.state.hanlder);
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
