import React from 'react';
import queryString from 'query-string';

import { RTL_QUERY_PARAM_NAME } from '../storiesHierarchy';

export const RTLWrapper = ({ rtl, children }) => {
  return rtl ? (
    <div dir="rtl" className="rtl">
      {children}
    </div>
  ) : (
    children
  );
};
RTLWrapper.defaultProps = {
  rtl:
    queryString.parse(window.location.search)[RTL_QUERY_PARAM_NAME] !==
    undefined,
};
