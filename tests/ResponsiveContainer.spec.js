import React from 'react';
import toJson from 'enzyme-to-json';
import ResponsiveContainer from '../src/views/ResponsiveContainer';
import { method } from '../src/router/ResponsiveContainer';
import * as controller from '../src/controllers/ResponsiveContainer';

const { shallow } = global;
const props = {};

describe('ResponsiveContainer', () => {
  describe('view', () => {
    it('should be rendered properly', () => {
      const tree = toJson(shallow(<ResponsiveContainer {...props} />));
      expect(tree).toMatchSnapshot();
    });
    it('should call methods during lifecycle', () => {
      const ownProps = {
        ...props,
        updateChildren: jest.fn(),
        addScreenListener: jest.fn(),
        removeScreenListener: jest.fn(),
      };
      const wrapper = shallow(
        <ResponsiveContainer {...ownProps} />,
        { lifecycleExperimental: true },
      );
      wrapper.setProps({ rand: '123' });
      wrapper.unmount();
      expect(ownProps.updateChildren).toHaveBeenCalledTimes(1);
      expect(ownProps.addScreenListener).toHaveBeenCalledTimes(1);
      expect(ownProps.removeScreenListener).toHaveBeenCalledTimes(1);
    });
  });
  describe('router', () => {
    it('should pass addScreenListener', () => {
      expect('addScreenListener' in method()).toBeTruthy();
    });
    it('should pass removeScreenListener', () => {
      expect('removeScreenListener' in method()).toBeTruthy();
    });
    it('should pass updateChildren', () => {
      expect('updateChildren' in method()).toBeTruthy();
    });
  });
  describe('controller', () => {
    describe('setWidthAndHeight', () => {
      const container = { offsetWidth: 150, offsetHeight: 150 };
      it('should return handler function', () => {
        const result = controller.setWidthAndHeight();
        expect(typeof result).toBe('function');
      });
      it('should update children if chilren is defined and children is not an array', () => {
        let result;
        const ownProps = {
          props: { children: <div /> },
          setState: (state) => { result = state; },
        };
        const handler = controller.setWidthAndHeight(container);
        handler.call(ownProps);
        expect(result).toBeDefined();
      });
      it('should update children if children is defined and children is an array', () => {
        let result;
        const ownProps = {
          props: { children: [<div />] },
          setState: (state) => { result = state; },
        };
        const handler = controller.setWidthAndHeight(container);
        handler.call(ownProps);
        expect(result).toBeDefined();
      });
      it('should skip updating if children is undefined', () => {
        let result;
        const ownProps = { props, setState: (state) => { result = state; } };
        const handler = controller.setWidthAndHeight(container);
        handler.call(ownProps);
        expect(result).toBeUndefined();
      });
    });
    describe('updateChildren', () => {
      let result;
      let ownProps;
      beforeEach(() => {
        result = undefined;
        ownProps = {
          props,
          state: { children: [<div key="test" width={100} height={100} />] },
          setState: (state) => { result = state; },
        };
      });
      it('should update children if children is not an array', () => {
        const nextProps = {
          children: <div />,
        };
        controller.updateChildren.call(ownProps, nextProps);
        expect(result).toBeDefined();
      });
      it('should update children if children is an array', () => {
        const nextProps = {
          children: [<div />],
        };
        controller.updateChildren.call(ownProps, nextProps);
        expect(result).toBeDefined();
      });
    });
    describe('addScreenListener', () => {
      it('should return hanlder', () => {
        let result;
        const container = { offsetWidth: 150, offsetHeight: 150 };
        const ownProps = {
          props: { children: <div /> },
          setState: (state) => { result = state; },
        };
        const temp = window.addEventListener;
        window.addEventListener = jest.fn();
        controller.addScreenListener.call(ownProps, container);
        expect(result).toBeDefined();
        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        window.addEventListener = temp;
      });
    });
    describe('removeScreenListener', () => {
      it('should call removeEventListener method', () => {
        const temp = window.removeEventListener;
        window.removeEventListener = jest.fn();
        controller.removeScreenListener();
        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        window.removeEventListener = temp;
      });
    });
  });
});
