import React from 'react';
import { RTLWrapper } from './RTLWrapper';

/**
 * Creates a component wrapper that Wrapper which:
 * - Adds autoExample__rtl prop mode if the URL query param `rtl` is defined
 */
export const createAutoExampleWrapper = componentType => {
  function AutoExampleWrapper(props) {
    // Prefixing with `autoExample__` to avoid name clashes with component props
    const { autoExample__rtl, ...rest } = props;
    return (
      <RTLWrapper rtl={autoExample__rtl}>
        {React.createElement(componentType, rest)}
      </RTLWrapper>
    );
  }

  AutoExampleWrapper.displayName = componentType.displayName;

  return AutoExampleWrapper;
};
