import React from 'react';
import toJson from 'enzyme-to-json';
import CanvasChessBoard from '../src/views/CanvasChessBoard';
import { method } from '../src/router/CanvasChessBoard';
import * as controller from '../src/controllers/CanvasChessBoard';

const { shallow } = global;
const coord = Array.from({ length: 17 }, (v, i) => {
  const arr = [];
  for (let j = 0; j <= 16; j += 1) arr.push([i * 10, j * 10]);
  return arr;
});
const props = {
  width: 160,
  height: 160,
  ratio: 1,
  grid: 15,
  coord,
};

describe('CanvasChessBoard', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const ownProps = { ...props };
      const tree = toJson(shallow(<CanvasChessBoard {...ownProps} />));
      expect(tree).toMatchSnapshot();
    });
    it('should call methods during lifecycle of component', () => {
      const ownProps = {
        ...props,
        drawBoard: jest.fn(),
      };
      const wrapper = shallow(
        <CanvasChessBoard {...ownProps} />,
        { lifecycleExperimental: true },
      );
      wrapper.setProps({ width: 500 });
      expect(ownProps.drawBoard).toHaveBeenCalledTimes(2);
    });
  });
  describe('router', () => {
    it('should pass drawBoard method', () => {
      expect('drawBoard' in method()).toBeTruthy();
    });
  });
  describe('controller', () => {
    let canvas;
    beforeEach(() => {
      canvas = document.createElement('canvas');
    });
    describe('drawLine', () => {
      it('should draw line properly by start point and end point', () => {
        const ctx = canvas.getContext('2d');
        const oriBase64String = canvas.toDataURL();
        const s = [100, 0];
        const e = [100, 100];
        controller.drawLine(ctx, s, e);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
    describe('drawBoard', () => {
      it('should draw board properly', () => {
        const oriBase64String = canvas.toDataURL();
        controller.drawBoard(canvas, props);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
  });
});
