import React from 'react';
import toJson from 'enzyme-to-json';
import { CanvasGoBang } from '../src/views/CanvasGoBang';

const { shallow } = global;

describe('CanvasGoBang', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const tree = toJson(shallow(<CanvasGoBang />));
      expect(tree).toMatchSnapshot();
    });
  });
});
