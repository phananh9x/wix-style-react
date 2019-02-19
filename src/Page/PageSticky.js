import React from 'react';
import PropTypes from 'prop-types';

import { PageContext } from './PageContext';
import s from './Page.scss';
import classNames from 'classnames';

export const PageSticky = ({ children, className, style, ...props }) => {
  return (
    <PageContext.Consumer>
      {({ stickyStyle }) => {
        let result;
        if (typeof children === 'function') {
          result = children({ style: style, className: s.sticky });
        } else {
          result = (
            <div
              className={classNames(s.sticky, className)}
              style={{ ...stickyStyle, ...style }}
              {...props}
            >
              {children}
            </div>
          );
        }

        return result;
      }}
    </PageContext.Consumer>
  );
};

PageSticky.displayName = 'Page.Sticky';
PageSticky.propTypes = {
  children: PropTypes.element.isRequired,
};
