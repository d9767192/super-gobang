import React, { Component } from 'react';
import { setCoordinate } from '../../controllers/coordinateSystem';

const coordinateSystem = WrappedComponent => (
  class extends Component {
    static defaultProps = {
      grid: 15,
      ratio: 1,
      width: 400,
    };
    componentWillMount() {
      setCoordinate.call(this);
    }
    componentWillReceiveProps() {
      setCoordinate.call(this);
    }
    render() {
      const { coord, width, height } = this.state;
      return coord ?
        (
          <WrappedComponent
            {...this.props}
            coord={this.state.coord}
            width={width}
            height={height}
          />
        ) :
        undefined;
    }
  }
);

export default coordinateSystem;
