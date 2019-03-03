import React from 'react';
import { node, bool, string, func, oneOf } from 'prop-types';

import { polyfill } from 'react-lifecycles-compat';

import Input from '../Input';
import { Hash } from './components/Hash';
import { ColorViewer } from './components/ColorViewer';

import { validateHex, extractHex } from './hex-helpers';

class ColorInput extends React.Component {
  static displayName = 'ColorInput';

  static propTypes = {
    /** placeholder to display */
    placeholder: node,
    /** when set to true this component is disabled */
    disabled: bool,
    /** sets error state */
    error: bool,
    /** error message which appears in tooltip */
    errorMessage: node,
    /** input size */
    size: oneOf(['small', 'medium', 'large']),
    /** colorpicker popover placement */
    popoverPlacement: oneOf([
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ]),
    /** colorpicker popover calculation to a dom element */
    popoverAppendTo: oneOf(['window', 'scrollParent', 'viewport', 'parent']),
    /** input value */
    value: string.isRequired,
    /** returns confirmed value */
    onConfirm: func,
    /** returns last confirmed value which is from user prop - value */
    onCancel: func,
    /** returns either input's or colorpicker's changed value */
    onChange: func,
  };

  static defaultProps = {
    placeholder: 'Please choose a color',
    error: false,
    size: 'medium',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    onChange: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      previous: props.value,
      value: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.active && props.value !== state.value) {
      return {
        ...state,
        value: extractHex(props.value),
      };
    }
  }

  _renderPrefix = () => {
    const { disabled, size } = this.props;
    const { active, value } = this.state;
    const hash = (
      <Input.Affix>
        <Hash disabled={disabled} size={this._sizeMapping(size)} />
      </Input.Affix>
    );
    return active || value ? hash : undefined;
  };

  _renderSuffix = () => {
    const { value, active } = this.state;
    const { size, popoverPlacement, popoverAppendTo, disabled } = this.props;
    return (
      <ColorViewer
        value={value}
        active={active}
        disabled={disabled}
        size={this._sizeMapping(size)}
        placement={popoverPlacement}
        appendTo={popoverAppendTo}
        onClick={this.click}
        onChange={this._onPickerChange}
        onCancel={this.cancel}
        onConfirm={this.confirm}
        onClickOutside={this.confirm}
      />
    );
  };

  _sizeMapping = size => (size === 'medium' ? 'normal' : size);

  _onChange = evt => {
    const { onChange } = this.props;
    const value = extractHex(evt.target.value);
    this.setState({ value: extractHex(value) }, () => onChange(value));
  };

  _onPickerChange = value => {
    const { onChange } = this.props;
    this.setState({ active: true, value }, () => onChange(value));
  };

  _onFocus = () => this.setState({ active: true });

  _keyDown = e => {
    e.stopPropagation();
    e.key === 'Enter' && this.confirm();
    e.key === 'Escape' && this.cancel();
  };

  click = () => {
    this.input.focus();
    this.setState({ active: true });
  };

  confirm = () => {
    const { onConfirm, onChange } = this.props;
    const value = validateHex(this.state.value);
    this.setState({ active: false, value, previous: value }, () => {
      onConfirm(value);
      onChange(value);
    });
  };

  cancel = () => {
    const { onCancel, onChange } = this.props;
    const { previous } = this.state;

    this.setState({ active: false, value: previous }, () => {
      onCancel(previous);
      onChange(previous);
    });
  };

  render() {
    const { placeholder, errorMessage, size, ...rest } = this.props;
    const { active, value } = this.state;
    return (
      <Input
        {...rest}
        ref={input => (this.input = input)}
        status={this.props.error ? 'error' : undefined}
        statusMessage={errorMessage}
        placeholder={active ? undefined : placeholder}
        size={this._sizeMapping(size)}
        onKeyDown={this._keyDown}
        onChange={this._onChange}
        onFocus={this._onFocus}
        onInputClicked={this.click}
        value={value.replace('#', '')}
        prefix={this._renderPrefix()}
        suffix={this._renderSuffix()}
      />
    );
  }
}

polyfill(ColorInput);

export default ColorInput;
