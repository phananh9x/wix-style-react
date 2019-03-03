import React from 'react';
import PropTypes from 'prop-types';
import LiveCodeExample from 'wix-storybook-utils/LiveCodeExample';

import * as wsrScope from '../../../../src/index';
import * as iconsScope from 'wix-ui-icons-common';

import styles from './styles.scss';

/**
 * A utility function to convert a props object to an array of props strings.
 * Example usage:
 *
 *  const myComponentString = props => `
 *    <div
 *      ${createPropsArray(props).join('\n    ')}
 *    />
 *  `;
 *
 *  myComponentString({ id: 'some-id', style: { padding: 5 }})
 *  // Will return:
 *  //  `<div
 *  //    id="some-id"
 *  //    style={{ padding: 5 }}
 *  //  />`
 */
export const createPropsArray = props =>
  Object.entries(props).map(([key, value]) => {
    if (value === true) {
      return key;
    } else if (typeof value === 'string') {
      return `${key}="${value}"`;
    }

    return `${key}={${JSON.stringify(value)}}`;
  });

/*
 * The following object defines the globals that'll be available in the live
 * example's context. If a component is failed to render, make sure it's
 * available in the index file.
 */
export const baseScope = {
  ...wsrScope,
  ...iconsScope,
};

const Component = props => {
  const { scope, title, ...rest } = props;

  // Remove `eslint-disable` comments
  const filteredCode = props.initialCode.replace(
    /^(\s)*\/\*(\s)*eslint-disable(\s)*\*\/(\s)*$/gm,
    '',
  );

  return (
    <div>
      {title && <div className={styles.title}>{title}</div>}

      <LiveCodeExample
        scope={{ ...baseScope, ...scope }}
        {...rest}
        initialCode={filteredCode}
      />
    </div>
  );
};

Component.propTypes = {
  ...LiveCodeExample.propTypes,
  title: PropTypes.string,
};

export default Component;
