import React from 'react';

const withConditionalWrapper = (WrappedComponent) => {
  function ComponentWithCondition(props) {
    if (!props.isConditionalRendering) return null;
    return <WrappedComponent {...props} />;
  }
  return ComponentWithCondition;
};

export default withConditionalWrapper;
