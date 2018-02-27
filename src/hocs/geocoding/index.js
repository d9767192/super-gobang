import React, { Component } from 'react';
import { setCoordinate } from '../../controllers/geocoding';

const geocoding = WrappedComponent => (
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
      const {
        coord,
        width,
        height,
        unitWidth,
        unitHeight,
      } = this.state;
      return coord ?
        (
          <WrappedComponent
            {...this.props}
            coord={coord}
            width={width}
            height={height}
            unitWidth={unitWidth}
            unitHeight={unitHeight}
          />
        ) :
        undefined;
    }
  }
);

export default geocoding;
