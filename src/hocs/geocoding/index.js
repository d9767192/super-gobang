import React, { Component } from 'react';
import PropTypes from 'prop-types';

const geocoding = WrappedComponent => (
  class extends Component {
    static defaultProps = {
      width: 400,
      ratio: 1,
      setCoordinate: () => {},
      detectWidthChanged: () => {},
    };
    static propTypes = {
      grid: PropTypes.number.isRequired,
      width: PropTypes.number,
      ratio: PropTypes.number,
      setCoordinate: PropTypes.func,
      detectWidthChanged: PropTypes.func,
    }
    constructor(props) {
      super(props);
      this.state = {
        coord: undefined,
        width: undefined,
        height: undefined,
        unitWidth: undefined,
        unitHeight: undefined,
      };
    }
    componentWillMount() {
      this.props.setCoordinate.call(this);
    }
    componentWillReceiveProps(nextProps) {
      this.props.detectWidthChanged.call(this, nextProps, this.props);
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
        null;
    }
  }
);

export default geocoding;
