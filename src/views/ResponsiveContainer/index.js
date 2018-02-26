import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResponsiveContainer extends Component {
  static defaultProps = {
    children: undefined,
  }
  static propTypes = {
    children: PropTypes.any,
  }
  componentWillMount() {

  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};
