import React from 'react';

function setWidthAndHeight(container) {
  return (
    function handler() {
      const { children } = this.props;
      if (children) {
        const childrenList = Array.isArray(children) ? children : [children];
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const clonedChildren = childrenList.map((child, idx) => {
          const key = idx;
          return React.cloneElement(child, { width, height, key });
        });
        this.setState({ children: clonedChildren });
      }
    }
  );
}
export function updateChildren(nextProps) {
  const { children: prevChildren } = this.state;
  const { children } = nextProps;
  const childrenList = Array.isArray(children) ? children : [children];
  const clonedChildren = childrenList.map((child, idx) => {
    const { props, key } = prevChildren[idx];
    const { width, height } = props;
    return React.cloneElement(child, { width, height, key });
  });
  this.setState({ children: clonedChildren });
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
