import React from 'react';

export function setWidthAndHeight(container, nextProps) {
  return (
    function handler() {
      const props = nextProps !== undefined ? nextProps : this.props;
      const { children, ...others } = props;
      const childrenList = Array.isArray(children) ? children : [children];
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const clonedChildren = childrenList.map((child, idx) => {
        const key = idx;
        return React.cloneElement(child, {
          ...others,
          width,
          height,
          key,
        });
      });
      this.setState({ children: clonedChildren });
    }
  );
}
export function addScreenListener(container) {
  let handler = setWidthAndHeight(container);
  handler = handler.bind(this);
  window.addEventListener('resize', handler);
  handler();
  return handler;
}
export const removeScreenListener = (handler) => {
  window.removeEventListener('resize', handler);
};

export default addScreenListener;
