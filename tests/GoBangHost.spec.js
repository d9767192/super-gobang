import React from 'react';
import toJson from 'enzyme-to-json';
import GoBangHost from '../src/views/GoBangHost';
import { method } from '../src/router/GoBangHost';
import * as controller from '../src/controllers/GoBangHost';
import * as config from '../src/controllers/GoBangHost/config';

const { shallow } = global;
const props = {};

describe('GoBangHost', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const ownProps = { ...props };
      const tree = toJson(shallow(<GoBangHost {...ownProps} />));
      expect(tree).toMatchSnapshot();
    });
    it('should call methods during lifecycle', () => {
      const ownProps = {
        ...props,
        addClickEventListener: jest.fn(),
        removeClickEventListener: jest.fn(),
        receivePropsHandler: jest.fn(),
        shouldUpdate: jest.fn(() => true),
        updated: jest.fn(),
      };
      const wrapper = shallow(
        <GoBangHost {...ownProps} />,
        { lifecycleExperimental: true },
      );
      wrapper.setProps({ grid: 14 });
      wrapper.unmount();
      expect(ownProps.addClickEventListener).toHaveBeenCalledTimes(1);
      expect(ownProps.removeClickEventListener).toHaveBeenCalledTimes(1);
      expect(ownProps.receivePropsHandler).toHaveBeenCalledTimes(1);
      expect(ownProps.shouldUpdate).toHaveBeenCalledTimes(1);
      expect(ownProps.updated).toHaveBeenCalledTimes(1);
    });
  });
  describe('router', () => {
    it('should pass addClickEventListener', () => {
      expect('addClickEventListener' in method()).toBeTruthy();
    });
    it('should pass removeClickEventListener', () => {
      expect('removeClickEventListener' in method()).toBeTruthy();
    });
    it('should pass receivePropsHandler', () => {
      expect('receivePropsHandler' in method()).toBeTruthy();
    });
    it('should pass shouldUpdate', () => {
      expect('shouldUpdate' in method()).toBeTruthy();
    });
  });
  describe('controller', () => {
    describe('isInBoundOfBoard', () => {
      const grid = 15;
      it('should return false if x <= 0', () => {
        const x = 0;
        const y = 1;
        const result = controller.isInBoundOfBoard(x, y, grid);
        expect(result).toBeFalsy();
      });
      it('should return false if x > grid', () => {
        const x = 16;
        const y = 1;
        const result = controller.isInBoundOfBoard(x, y, grid);
        expect(result).toBeFalsy();
      });
      it('should return false if y <= 0', () => {
        const x = 1;
        const y = 0;
        const result = controller.isInBoundOfBoard(x, y, grid);
        expect(result).toBeFalsy();
      });
      it('should return false if y > grid', () => {
        const x = 1;
        const y = 16;
        const result = controller.isInBoundOfBoard(x, y, grid);
        expect(result).toBeFalsy();
      });
      it('should return true if 0 <= x <= grid and 0 <= y <= grid', () => {
        const x = 1;
        const y = 1;
        const result = controller.isInBoundOfBoard(x, y, grid);
        expect(result).toBeTruthy();
      });
    });
    describe('updateChessMoves', () => {
      const x = 1;
      const y = 1;
      const ownProps = { ...props, wColor: '#ffffff', bColor: '#000000' };
      it('should update chess moves with black piece and black player if the length of updated chess is odd', () => {
        const chessmoves = [];
        const result = controller.updateChessMoves(chessmoves, x, y, ownProps);
        expect(result.nextChessMoves.length).toBe(1);
        expect(result.player).toBe(config.black);
        expect(result.color).toBe(ownProps.bColor);
      });
      it('should update chess moves with white piece and white player if the length of updated chess is even', () => {
        const chessmoves = [{ x: 10, y: 10, color: '#000000' }];
        const result = controller.updateChessMoves(chessmoves, x, y, ownProps);
        expect(result.nextChessMoves.length).toBe(2);
        expect(result.player).toBe(config.white);
        expect(result.color).toBe(ownProps.wColor);
      });
    });
    describe('calculateXY', () => {
      it('should return coordinate x and y', () => {
        const target = {
          getAttribute: () => 160,
        };
        const posX = 14;
        const posY = 14;
        const grid = 15;
        const result = controller.calculateXY(target, posX, posY, grid);
        expect(result.x).toBe(1);
        expect(result.y).toBe(1);
      });
    });
    describe('pointExisted', () => {
      it('should return true if point is defined in chess moves list', () => {
        const x = 10;
        const y = 10;
        const color = '#000000';
        const chessMoves = [{ x, y, color }];
        const otherConditions = ({ color: itemColor }) => itemColor === color;
        const result = controller.pointExisted(x, y, chessMoves, otherConditions);
        expect(result).toBeTruthy();
      });
      it('should return false if point is undefined in chess moves list', () => {
        const x = 10;
        const y = 10;
        const chessMoves = [{ x, y }];
        const result = controller.pointExisted(11, 11, chessMoves);
        expect(result).toBeFalsy();
      });
    });
    describe('getWinConditions', () => {
      const grid = 15;
      it('should get 8 win conditions if x directional chain and y directional chain are in region', () => {
        const x = 7;
        const y = 7;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(8);
      });
      it('should get 5 win conditions if y directional chain exceeds top boundary', () => {
        const x = 7;
        const y = 1;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(5);
      });
      it('should get 3 win conditions if y directional chain exceeds top boundary and x directional chain exceeds right boundary', () => {
        const x = 13;
        const y = 1;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(3);
      });
      it('should get 5 win conditions if x directional chain exceeds right boundary', () => {
        const x = 13;
        const y = 7;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(5);
      });
      it('should get 3 win conditions if x directional chain exceeds right boundary and y directional chain exceeds bottom boundary', () => {
        const x = 13;
        const y = 13;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(3);
      });
      it('should get 5 win conditions if y directional chain exceeds bottom boundary', () => {
        const x = 7;
        const y = 13;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(5);
      });
      it('should get 3 win conditions if x directional chain exceeds left boundary and y directional chain exceeds bottom boundary', () => {
        const x = 3;
        const y = 13;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(3);
      });
      it('should get 5 win conditions if x directional chain exceeds left boundary', () => {
        const x = 3;
        const y = 7;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(5);
      });
      it('should get 3 win conditions if x directional chain exceeds left boundary and y directional chain exceeds top boundary', () => {
        const x = 3;
        const y = 3;
        const result = controller.getWinConditions(x, y, grid);
        expect(result.length).toBe(3);
      });
    });
    describe('checkWin', () => {
      const x = 5;
      const y = 1;
      const grid = 15;
      it('should return true if chess moves match one of win condition', () => {
        const chessmoves = [
          { x: 1, y: 1, color: config.bColor },
          { x: 1, y: 2, color: config.wColor },
          { x: 2, y: 1, color: config.bColor },
          { x: 2, y: 2, color: config.wColor },
          { x: 3, y: 1, color: config.bColor },
          { x: 3, y: 2, color: config.wColor },
          { x: 4, y: 1, color: config.bColor },
          { x: 4, y: 2, color: config.wColor },
          { x: 5, y: 1, color: config.bColor },
        ];
        const result = controller.checkWin(x, y, config.bColor, grid, chessmoves);
        expect(result).toBeTruthy();
      });
      it('should return false if the length of chess moves is lower than 9', () => {
        const chessmoves = [];
        const result = controller.checkWin(x, y, config.bColor, grid, chessmoves);
        expect(result).toBeFalsy();
      });
    });
    describe('isGameOver', () => {
      it('should return true and call gameover with winner if checkWin said there is a winner', () => {
        let winner;
        const chessmoves = [
          { x: 1, y: 1, color: config.bColor },
          { x: 1, y: 2, color: config.wColor },
          { x: 2, y: 1, color: config.bColor },
          { x: 2, y: 2, color: config.wColor },
          { x: 3, y: 1, color: config.bColor },
          { x: 3, y: 2, color: config.wColor },
          { x: 4, y: 1, color: config.bColor },
          { x: 4, y: 2, color: config.wColor },
          { x: 5, y: 1, color: config.bColor },
        ];
        const { x, y, color } = chessmoves[chessmoves.length - 1];
        const player = config.black;
        const ownProps = { gameOver: jest.fn((result) => { winner = result; }), grid: 15 };
        const result = controller.isGameOver(chessmoves, x, y, color, player, ownProps);
        expect(result).toBeTruthy();
        expect(winner).toBe(player);
      });
      it('should return false and call gameover with deadlock if full pieces on chess board and there is no winner', () => {
        let winner;
        const chessmoves = Array.from(
          { length: 225 },
          () => ({ x: 1, y: 1, color: config.wColor }),
        );
        const x = 16;
        const y = 16;
        const color = config.bColor;
        const player = config.black;
        const ownProps = { gameOver: jest.fn((result) => { winner = result; }), grid: 15 };
        const result = controller.isGameOver(chessmoves, x, y, color, player, ownProps);
        expect(result).toBeFalsy();
        expect(winner).toBe(config.deadlock);
      });
      it('should return false if checkWin said there is no winner', () => {
        const chessmoves = [
          { x: 1, y: 1, color: config.bColor },
          { x: 1, y: 2, color: config.wColor },
          { x: 2, y: 1, color: config.bColor },
          { x: 2, y: 2, color: config.wColor },
          { x: 3, y: 1, color: config.bColor },
          { x: 3, y: 2, color: config.wColor },
          { x: 4, y: 1, color: config.bColor },
          { x: 4, y: 2, color: config.wColor },
        ];
        const { x, y, color } = chessmoves[chessmoves.length - 1];
        const player = config.white;
        const ownProps = { gameOver: jest.fn(), grid: 15 };
        const result = controller.isGameOver(chessmoves, x, y, color, player, ownProps);
        expect(result).toBeFalsy();
      });
    });
    describe('updateIfPointIsValid', () => {
      it('should update piece into chess moves if the piece doesnt exist and its in boundary', () => {
        let result;
        const x = 7;
        const y = 7;
        const chessmoves = [];
        const ownProps = { ...props, grid: 15 };
        const self = { setState: (response) => { result = response; } };
        controller.updateIfPointIsValid.call(self, x, y, chessmoves, ownProps);
        expect(result.chessMoves.length).toBe(1);
      });
      it('should skip updating if the piece is already on the board', () => {
        let result;
        const chessmoves = [{ x: 7, y: 7, color: config.bColor }];
        const { x, y } = chessmoves[0];
        const ownProps = { ...props, grid: 15 };
        const self = { setState: (response) => { result = response; } };
        controller.updateIfPointIsValid.call(self, x, y, chessmoves, ownProps);
        expect(result).toBeUndefined();
      });
    });
    describe('addPiece', () => {
      const ownProps = {
        ...props,
        bColor: config.bColor,
        wColor: config.wColor,
        grid: 15,
      };
      const e = {
        target: {
          getAttribute: (type) => {
            switch (type) {
              case 'target': return true;
              case 'width': return 160;
              case 'height': return 160;
              default: break;
            }
            return undefined;
          },
        },
        offsetX: 14,
        offsetY: 14,
      };
      const self = {
        setState: jest.fn(),
        state: {
          locked: false,
          chessMoves: [],
        },
      };
      it('should return hanlder function', () => {
        const result = controller.addPiece();
        expect(typeof result).toBe('function');
      });
      it('should update pieces if target is right and locked is false', () => {
        controller.addPiece(ownProps).call(self, e);
        expect(self.setState).toHaveBeenCalledTimes(1);
      });
      it('should skip updating if target is wrong or locked is true', () => {
        self.state.locked = true;
        self.setState = jest.fn();
        controller.addPiece(ownProps).call(self, e);
        expect(self.setState).not.toHaveBeenCalled();
      });
    });
    describe('fallbackPieces', () => {
      it('should fallback 1 piece if locked is false and single mode is false', () => {
        let result;
        const ownProps = { ...props, singleRace: false };
        const self = {
          setState: (response) => { result = response; },
          state: {
            chessMoves: [{ x: 1, y: 1, color: config.bColor }],
            locked: false,
          },
        };
        controller.fallbackPieces.call(self, ownProps);
        expect(result.chessMoves.length).toBe(0);
      });
      it('should fallback 2 pieces if locked is false and single mode is true', () => {
        let result;
        const ownProps = { ...props, singleRace: true };
        const self = {
          setState: (response) => { result = response; },
          state: {
            chessMoves: [
              { x: 1, y: 1, color: config.bColor },
              { x: 1, y: 2, color: config.wColor },
            ],
            locked: false,
          },
        };
        controller.fallbackPieces.call(self, ownProps);
        expect(result.chessMoves.length).toBe(0);
      });
      it('should skip if locked is true', () => {
        let result;
        const ownProps = { ...props, singleRace: true };
        const self = {
          setState: (response) => { result = response; },
          state: {
            chessMoves: [{ x: 1, y: 1, color: config.bColor }],
            locked: true,
          },
        };
        controller.fallbackPieces.call(self, ownProps);
        expect(result).toBeUndefined();
      });
    });
    describe('restartGame', () => {
      it('should reset state', () => {
        let result;
        const self = { setState: (response) => { result = response; } };
        controller.restartGame.call(self);
        expect(result.chessMoves.length).toBe(0);
        expect(result.locked).toBeFalsy();
      });
    });
    describe('addClickEventListener', () => {
      it('should add click event listener and set it as state', () => {
        let result;
        const temp = window.addEventListener;
        window.addEventListener = jest.fn();
        const self = { setState: (response) => { result = response; } };
        controller.addClickEventListener.call(self);
        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        expect('listener' in result).toBeTruthy();
        window.addEventListener = temp;
      });
    });
    describe('removeClickEventListener', () => {
      it('should call removeEventlistener', () => {
        const temp = window.removeEventListener;
        window.removeEventListener = jest.fn();
        const self = { state: { listener: () => {} } };
        controller.removeClickEventListener.call(self);
        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        window.removeEventListener = temp;
      });
    });
    describe('receivePropsHandler', () => {
      it('should fallback piece if fallback is true', () => {
        const ownProps = {
          ...props,
          fallback: true,
          restart: false,
          singleRace: false,
        };
        const self = {
          setState: jest.fn(),
          state: {
            chessMoves: [{ x: 1, y: 1, color: config.bColor }],
            locked: false,
          },
        };
        controller.receivePropsHandler.call(self, ownProps);
        expect(self.setState).toHaveBeenCalledTimes(1);
      });
      it('should restart game if restart is true', () => {
        const ownProps = { ...props, fallback: false, restart: true };
        const self = { setState: jest.fn() };
        controller.receivePropsHandler.call(self, ownProps);
        expect(self.setState).toHaveBeenCalledTimes(1);
      });
      it('should skip if restart and fallback both false', () => {
        const ownProps = { ...props, fallback: false, restart: false };
        const self = { setState: jest.fn() };
        controller.receivePropsHandler.call(self, ownProps);
        expect(self.setState).toHaveBeenCalledTimes(0);
      });
    });
    describe('shouldUpdate', () => {
      it('should return true if the length of next chess moves is different with current one', () => {
        const nextState = { chessMoves: [{ x: 1, y: 1, color: config.bColor }] };
        const state = { chessMoves: [] };
        const result = controller.shouldUpdate(nextState, state);
        expect(result).toBeTruthy();
      });
      it('should return false if the length of next chess moves is same with current one', () => {
        const nextState = { chessMoves: [] };
        const state = nextState;
        const result = controller.shouldUpdate(nextState, state);
        expect(result).toBeFalsy();
      });
    });
  });
});
