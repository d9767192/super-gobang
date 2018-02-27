import React from 'react';

function findWidth(container, props) {
  return (
    function handler() {
      const { children, ...others } = props;
      const childrenList = Array.isArray(children) ? children : [children];
      const width = container.offsetWidth;
      const clonedChildren = childrenList.map((child, idx) => {
        const key = idx;
        return React.cloneElement(child, { ...others, width, key });
      });
      this.setState({ children: clonedChildren });
    }
  );
}
export function addScreenListener(container, props) {
  let handler = findWidth(container, props);
  handler = handler.bind(this);
  window.addEventListener('resize', handler);
  handler();
  return handler;
}
export const removeScreenListener = (handler) => {
  window.removeEventListener('resize', handler);
};

export default addScreenListener;
