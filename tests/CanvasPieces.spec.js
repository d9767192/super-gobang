import React from 'react';
import toJson from 'enzyme-to-json';
import CanvasPieces from '../src/views/CanvasPieces';
import { method } from '../src/router/CanvasPieces';
import * as controller from '../src/controllers/CanvasPieces';

const { shallow } = global;
const unitWidth = 10;
const coord = Array.from({ length: 17 }, (v, i) => {
  const arr = [];
  for (let j = 0; j <= 16; j += 1) arr.push([i * 10, j * 10]);
  return arr;
});
const props = {
  width: 160,
  height: 160,
  unitWidth: 10,
  coord,
};

describe('CanvasChessPieces', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const ownProps = { ...props };
      const tree = toJson(shallow(<CanvasPieces {...ownProps} />));
      expect(tree).toMatchSnapshot();
    });
    it('should call methods during lifecycle', () => {
      const ownProps = {
        ...props,
        detectChessMovesChange: jest.fn(),
        detectWidthChange: jest.fn(),
      };
      const wrapper = shallow(
        <CanvasPieces {...ownProps} />,
        { lifecycleExperimental: true },
      );
      wrapper.setProps({ width: 500 });
      expect(ownProps.detectChessMovesChange).toHaveBeenCalledTimes(1);
      expect(ownProps.detectWidthChange).toHaveBeenCalledTimes(1);
    });
  });
  describe('router', () => {
    it('should pass detectChessMovesChange', () => {
      expect('detectChessMovesChange' in method()).toBeTruthy();
    });
    it('should pass detectWidthChange', () => {
      expect('detectWidthChange' in method()).toBeTruthy();
    });
  });
  describe('controller', () => {
    let canvas;
    let oriBase64String;
    beforeEach(() => {
      canvas = document.createElement('canvas');
      canvas.width = props.width;
      canvas.height = props.height;
    });
    describe('clearCanvas', () => {
      it('should clear canvas in region of context', () => {
        const ctx = canvas.getContext('2d');
        ctx.fillRect(45, 45, 55, 55);
        oriBase64String = canvas.toDataURL();
        controller.clearCanvas(ctx, props.width, props.height);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
    describe('clearPiece', () => {
      it('should clear canvas in region of piece', () => {
        const coordinate = [50, 50];
        const ctx = canvas.getContext('2d');
        ctx.fillRect(45, 45, 55, 55);
        oriBase64String = canvas.toDataURL();
        controller.clearPiece(ctx, coordinate, unitWidth);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
    describe('drawPiece', () => {
      it('should draw a piece on the context', () => {
        const ctx = canvas.getContext('2d');
        oriBase64String = canvas.toDataURL();
        const coordinate = [50, 50];
        const color = '#000000';
        controller.drawPiece(ctx, coordinate, unitWidth, color);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
    describe('addOrRemovePiece', () => {
      it('should draw piece on context if the length of next chess moves is greater than current chess moves', () => {
        const ctx = canvas.getContext('2d');
        oriBase64String = canvas.toDataURL();
        const nextProps = { chessMoves: [{ x: 5, y: 5, color: '#000000' }], unitWidth, coord };
        const currentProps = { chessMoves: [] };
        controller.addOrRemovePiece(ctx, nextProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
      it('should remove pieces on context if the length of next chess moves is lower than current chess moves', () => {
        const ctx = canvas.getContext('2d');
        const coordinate = [50, 50];
        const color = '#000000';
        controller.drawPiece(ctx, coordinate, unitWidth, color);
        oriBase64String = canvas.toDataURL();
        const nextProps = { chessMoves: [], unitWidth, coord };
        const currentProps = { chessMoves: [{ x: 5, y: 5, color: '#000000' }] };
        controller.addOrRemovePiece(ctx, nextProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
      it('should skip if the length of next chess moves equals to current chess moves', () => {
        const ctx = canvas.getContext('2d');
        oriBase64String = canvas.toDataURL();
        const nextProps = { chessMoves: [], unitWidth, coord };
        const currentProps = { chessMoves: [] };
        controller.addOrRemovePiece(ctx, nextProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).toBe(oriBase64String);
      });
    });
    describe('redrawPieces', () => {
      it('should redraw pieces on context', () => {
        oriBase64String = canvas.toDataURL();
        const ownProps = {
          ...props,
          unitWidth,
          coord,
          chessMoves: [{ x: 5, y: 5, color: '#000000' }],
        };
        const ctx = canvas.getContext('2d');
        controller.redrawPieces(ctx, ownProps);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
    });
    describe('detectChessMovesChange', () => {
      it('should call addOrRemovePiece if the length of next chess moves is different with current chess moves', () => {
        oriBase64String = canvas.toDataURL();
        const nextProps = { chessMoves: [{ x: 5, y: 5, color: '#000000' }], unitWidth, coord };
        const currentProps = { chessMoves: [] };
        controller.detectChessMovesChange(canvas, nextProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
      it('should skip if the length of next chess moves equals to current chess moves', () => {
        oriBase64String = canvas.toDataURL();
        const nextProps = { chessMoves: [], unitWidth, coord };
        const currentProps = { chessMoves: [] };
        controller.detectChessMovesChange(canvas, nextProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).toBe(oriBase64String);
      });
    });
    describe('detectWidthChange', () => {
      it('should call redraw if next width is different with current width', () => {
        oriBase64String = canvas.toDataURL();
        const prevProps = {
          ...props,
          unitWidth,
          coord,
          chessMoves: [{ x: 5, y: 5, color: '#000000' }],
        };
        const currentProps = { width: 0 };
        controller.detectWidthChange(canvas, prevProps, currentProps);
        const base64String = canvas.toDataURL();
        expect(base64String).not.toBe(oriBase64String);
      });
      it('should skip if next width is same with current width', () => {
        oriBase64String = canvas.toDataURL();
        controller.detectWidthChange(canvas, props, props);
        const base64String = canvas.toDataURL();
        expect(base64String).toBe(oriBase64String);
      });
    });
  });
});
