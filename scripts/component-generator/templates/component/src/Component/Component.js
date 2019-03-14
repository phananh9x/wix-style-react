import React from 'react';
import PropTypes from 'prop-types';
import styles from './{%ComponentName%}.scss';

import Text from '../Text';
import Button from '../Button';

{%descriptionJSDoc%}
class {%ComponentName%} extends React.PureComponent {
  static displayName = '{%ComponentName%}';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Text for the button */
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    buttonText: 'Click me!',
  };

  state = {
    count: 0,
  };

  _handleClick = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    const { dataHook, buttonText } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <Text dataHook="{%componentName%}-count">
          You clicked this button {count} times
        </Text>

        <div className={styles.button}>
          <Button
            onClick={this._handleClick}
            dataHook="{%componentName%}-button"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
}

export default {%ComponentName%};
