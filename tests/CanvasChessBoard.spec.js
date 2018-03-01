import React from 'react';
import toJson from 'enzyme-to-json';
import CanvasChessBoard from '../src/views/CanvasChessBoard';

const { shallow } = global;
const props = {
  width: 400,
  height: 400,
};

describe('CanvasChessBoard', () => {
  describe('views', () => {
    it('should be rendered properly', () => {
      const ownProps = { ...props };
      const tree = toJson(shallow(<CanvasChessBoard {...ownProps} />));
      expect(tree).toMatchSnapshot();
    });
  });
});
