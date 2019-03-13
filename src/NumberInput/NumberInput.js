import React from 'react';
import _ from 'lodash';
import Input from '../Input';

class NumberInput extends React.PureComponent {
  static displayName = 'NumberInput';

  state = {
    value: '',
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value: this._defaultValueNullIfEmpty(value),
    };
  }

  componentWillReceiveProps({ value }) {
    this.setState({
      value: this._defaultValueNullIfEmpty(value),
    });
  }

  _defaultValueNullIfEmpty(value) {
    return _.isNil(value) || value === '' ? null : +value;
  }

  _defaultValueToNullIfInvalidNumber(value) {
    return ['.', '-', undefined, ''].includes(value) ? null : +value;
  }

  _getInputValueFromState() {
    const { value } = this.state;
    return _.isNil(value) ? '' : value;
  }

  _isInRange(value) {
    const { min, max } = this.props;
    if (!isNaN(min) && value < min) {
      return false;
    }
    if (!isNaN(max) && value > max) {
      return false;
    }
    return true;
  }

  _increment = () => {
    this._applyChange((value, step) => value + step);
  };

  _decrement = () => {
    this._applyChange((value, step) => value - step);
  };

  _applyChange(operator) {
    const { value, step } = this.props,
      numberValue = parseFloat(value || this.inputDOM.value) || 0,
      numberStep = step,
      updatedValue = operator(numberValue, numberStep);
    if (this._isInRange(updatedValue)) {
      this._triggerOnChange(updatedValue);
    }
  }

  _triggerOnChange(value) {
    const { onChange } = this.props;
    this.setState(
      {
        value,
      },
      () =>
        onChange && onChange(this._defaultValueToNullIfInvalidNumber(value)),
    );
  }

  _inputValueChanged = e => {
    return this._triggerOnChange(e.target.value);
  };

  _getInputRef = ref => {
    const { inputRef } = this.props;
    this.inputDOM = ref;
    if (inputRef) {
      inputRef(ref);
    }
  };

  render() {
    const { suffix, ...props } = this.props;

    return (
      <Input
        {...props}
        type="number"
        value={this._getInputValueFromState()}
        onChange={this._inputValueChanged}
        inputRef={this._getInputRef}
        suffix={
          <Input.Group>
            {suffix}
            <Input.Ticker
              onUp={this._increment}
              onDown={this._decrement}
              dataHook="number-input-ticker"
            />
          </Input.Group>
        }
      />
    );
  }
}

NumberInput.propTypes = {
  ...Input.propTypes,
};

NumberInput.defaultProps = {
  step: 1,
};
export default NumberInput;
