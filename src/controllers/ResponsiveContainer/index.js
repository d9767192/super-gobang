import React from 'react';

/**
 * Set width and height into children
 * @param {element} container The element of the container
 */
export function setWidthAndHeight(container) {
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
/**
 * Update childern (force on updating properties of children)
 * @param {*} nextProps Next properties of the component
 */
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
/**
 * Add screen resize event
 * @param {element} container The element of the container
 * @returns {function} Registed function
 */
export function addScreenListener(container) {
  let handler = setWidthAndHeight(container);
  handler = handler.bind(this);
  window.addEventListener('resize', handler);
  handler();
  return handler;
}
/**
 * Remove screen resize event
 * @param {function} handler Registed function
 */
export const removeScreenListener = (handler) => {
  window.removeEventListener('resize', handler);
};

export default addScreenListener;
