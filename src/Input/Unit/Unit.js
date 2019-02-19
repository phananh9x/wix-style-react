import React from 'react';
import PropTypes from 'prop-types';
import deprecationLog from '../../utils/deprecationLog';

import styles from '../Input.scss';

class Unit extends React.Component {
  constructor(props) {
    super(props);
    deprecationLog(
      'Input.Unit component is deprecated and will be removed in the next major release, please use Input.Affix instead',
    );
  }
  render() {
    const { children, value, dataHook } = this.props;
    return (
      <div className={styles.unit} data-hook={dataHook}>
        {value || children}
      </div>
    );
  }
}

Unit.displayName = 'Input.Unit';
Unit.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};

export default Unit;
