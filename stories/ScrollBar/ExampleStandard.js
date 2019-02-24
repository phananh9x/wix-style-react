import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ScrollBar.scss';
import { LongTextContent } from '../components/Page/SomeContentComponent';

class ExampleStandard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    theme: PropTypes.string,
  };

  render() {
    return (
      <div className={styles.root}>
        <LongTextContent />
      </div>
    );
  }
}

export default ExampleStandard;
