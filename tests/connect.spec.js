import React from 'react';
import toJson from 'enzyme-to-json';
import { connect } from '../src/hocs/connect';
import { CanvasGoBang } from '../src/views/CanvasGoBang';

const { shallow } = global;

describe('connect', () => {
  describe('view', () => {
    it('should be rendered with method as props if method is a function', () => {
      const method = () => ({ test: () => {} });
      const WrappedComponent = connect(method)(CanvasGoBang);
      const tree = toJson(shallow(<WrappedComponent />));
      expect(tree).toMatchSnapshot();
    });
    it('should be rendered properly without method if method is not a function', () => {
      const WrappedComponent = connect(null)(CanvasGoBang);
      const tree = toJson(shallow(<WrappedComponent />));
      expect(tree).toMatchSnapshot();
    });
  });
});
