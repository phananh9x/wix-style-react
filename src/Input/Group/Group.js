import React from 'react';
import PropTypes from 'prop-types';

import styles from './Group.scss';
import InputConsumer from '../InputConsumer';

const Group = ({ children }) => (
  <InputConsumer consumerCompName={Group.displayName}>
    {() => <div className={styles.root}>{children}</div>}
  </InputConsumer>
);

Group.displayName = 'Input.Group';
Group.propTypes = {
  children: PropTypes.node,
};

export default Group;
