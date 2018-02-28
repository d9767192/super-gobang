import React, { Component } from 'react';
import { setCoordinate, detectWidthChanged } from '../../controllers/geocoding';

const geocoding = WrappedComponent => (
  class extends Component {
    static defaultProps = {
      ratio: 1,
      width: 400,
    };
    componentWillMount() {
      setCoordinate.call(this);
    }
    componentWillReceiveProps(nextProps) {
      detectWidthChanged.call(this, nextProps, this.props);
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
