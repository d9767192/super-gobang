import React from 'react';
import toJson from 'enzyme-to-json';
import geocoding from '../src/hocs/geocoding';
import { CanvasGoBang } from '../src/views/CanvasGoBang';
import { method } from '../src/router/geocoding';
import * as controller from '../src/controllers/geocoding';

const unitWidth = 10;
const unitHeight = 10;
const props = {
  width: 160,
  ratio: 1,
  grid: 15,
};

describe('geocoding', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const WrappedComponent = geocoding(CanvasGoBang);
      const mockFn = jest.fn();
      const ownProps = {
        ...props,
        setCoordinate: function coord() {
          this.setState({
            coord: [],
            unitWidth,
            unitHeight,
            height: 100,
            ...props,
          });
          mockFn();
        },
        detectWidthChanged: jest.fn(),
      };
      const wrapper = shallow(
        <WrappedComponent {...ownProps} />,
        { lifecycleExperimental: true },
      );
      const tree = toJson(wrapper);
      wrapper.setProps({ width: 200 });
      expect(tree).toMatchSnapshot();
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(ownProps.detectWidthChanged).toHaveBeenCalledTimes(1);
    });
    it('should render nothing if coord is undefined', () => {
      const WrappedComponent = geocoding(CanvasGoBang);
      const tree = toJson(shallow(<WrappedComponent {...props} />));
      expect(tree).toMatchSnapshot();
    });
  });
  describe('router', () => {
    it('should pass setCoordinate', () => {
      expect('setCoordinate' in method()).toBeTruthy();
    });
    it('should pass detectWidthChanged', () => {
      expect('detectWidthChanged' in method()).toBeTruthy();
    });
  });
  describe('controller', () => {
    let self;
    beforeEach(() => {
      self = {
        props,
        setState: function set(state) { this.state = state; },
        getState: function get() { return this.state; },
      };
    });
    describe('setCoordinate', () => {
      it('should set coordinates, unitWidth, unitHeight, width and height into state', () => {
        controller.setCoordinate.call(self);
        const state = self.getState();
        expect(state.unitWidth).toBe(10);
        expect(state.unitHeight).toBe(10);
        expect(state.width).toBe(160);
        expect(state.height).toBe(160);
        expect('coord' in state).toBeTruthy();
      });
      it('should return false if width is not a number', () => {
        const newProps = Object.assign({}, props, { width: undefined });
        self.props = newProps;
        const result = controller.setCoordinate.call(self);
        expect(result).toBeFalsy();
      });
    });
    describe('detectWidthChanged', () => {
      it('should call setCoordinate if next width is different with current width', () => {
        const nextProps = { ...props, width: 100 };
        controller.detectWidthChanged.call(self, nextProps, props);
        expect(self.state).toBeDefined();
      });
      it('should skip if next width is same with current width', () => {
        controller.detectWidthChanged.call(self, props, props);
        expect(self.state).toBeUndefined();
      });
    });
  });
});
