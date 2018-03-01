import React from 'react';

export const connect = method => (
  WrappedComponent => (
    (props) => {
      const methodWithProps = typeof method === 'function' ? method(props) : {};
      return (
        <WrappedComponent {...methodWithProps} {...props} />
      );
    }
  )
);

export default connect;
