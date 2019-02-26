import React from 'react';
import PropTypes from 'prop-types';

import PageDeprecated from './Page.deprecated';
import PageNew from './Page';
import { allValidators } from '../utils/propTypes';

const Page = props => {
  const { upgrade, ...rest } = props;

  return upgrade ? <PageNew {...rest} /> : <PageDeprecated {...rest} />;
};

Page.propTypes = {
  upgrade: allValidators(
    PropTypes.bool,
    (/*props, propName, componentName*/) => {
      /* depLog disabled until tests arr written and QA goes over it */
      // if (!props[propName]) {
      //       deprecationLog(`
      // ${componentName}: New Layout API ! Please set upgrade=true prop to use new Layout API.
      // When enabled, the page will use height: 100% and not require a parent of 'display: flex;flex-flow: column;'.
      // Also Page.Content's may grow using 'min-height: inherit'. Supports Page.Sticky. New header minimization approach.
      // See docs for more info: https://github.com/wix/wix-style-react/blob/master/src/Page/README.MIGRATION.md
      // `);
      // }
    },
  ),
};

Page.displayName = 'Page';
Page.Header = PageNew.Header;
Page.Content = PageNew.Content;
Page.FixedContent = PageNew.FixedContent; // TODO: Add deprecationLog, use Page.Sticky instead
Page.Tail = PageNew.Tail;
Page.Sticky = PageNew.Sticky;

export default Page;
