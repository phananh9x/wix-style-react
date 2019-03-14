import React from 'react';
import { string, bool } from 'prop-types';
import classNames from 'classnames';

import typography from '../../src/Typography';
import styles from './styles.scss';

const headingClasses = props => {
  return classNames({
    [typography[props.appearance]]: props.appearance,
    [typography.light]: props.light,
  });
};

const HeadingExample = props => {
  const boolLabel = val =>
    val === undefined ? `[false]` : val ? 'true' : 'false';
  const light = boolLabel(props.light);
  return (
    <tr>
      <td>{props.appearance}</td>
      <td>{light}</td>
      <td style={{ backgroundColor: props.light ? 'black' : 'white' }}>
        <span className={headingClasses(props)}>This is a heading</span>
      </td>
    </tr>
  );
};

HeadingExample.propTypes = {
  appearance: string.isRequired,
  light: bool,
  note: string,
};

export function renderHeadingTable() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Appearance</th>
          <th>Light</th>
          <th>Example</th>
        </tr>
      </thead>
      <HeadingExample appearance="h1" />
      <HeadingExample appearance="h2" />
      <HeadingExample appearance="h3" />
      <HeadingExample appearance="h4" />
      <HeadingExample appearance="h5" />
      <HeadingExample appearance="h6" />

      <HeadingExample appearance="h1" light />
      <HeadingExample appearance="h2" light />
      <HeadingExample appearance="h3" light />
      <HeadingExample appearance="h4" light />
      <HeadingExample appearance="h5" light />
      <HeadingExample appearance="h6" light />
    </table>
  );
}
