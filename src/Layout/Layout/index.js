import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Layout = ({ children, gap, cols, justifyItems, alignItems }) => (
  <div
    style={{
      gridGap: gap,
      justifyItems,
      alignItems,
      gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : undefined,
    }}
    className={styles.root}
    children={children}
  />
);

Layout.displayName = 'Layout';

Layout.propTypes = {
  /** one or more Cell components. Other nodes are accepted although not recommended */
  children: PropTypes.node,

  /** distance between cells both vertically and horizontally */
  gap: PropTypes.string,

  /** set custom amount of columns to be rendered. Default is 12 which means at `<Cell span={12}/>` occupies all columns, in other words, full width */
  cols: PropTypes.number,

  /** is used to justify the grid items along the row axis */
  justifyItems: PropTypes.string,

  /** is used to aligns the grid items along the column axis */
  alignItems: PropTypes.string,
};

Layout.defaultProps = {
  gap: '30px',
};

export default Layout;
