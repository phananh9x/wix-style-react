import React from 'react';
import color from 'color';
import { object, string, func, bool, oneOfType, node } from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import ColorPickerHsb from './ColorPickerHsb';
import ColorPickerHue from './ColorPickerHue';
import ColorPickerHistory from './ColorPickerHistory';
import ColorPickerConverter from './ColorPickerConverter';
import ColorPickerActions from './ColorPickerActions';

import css from './ColorPicker.scss';

const FALLBACK_COLOR = color('#86c6e5');

/**
 * Color Picker
 *
 * Under the hood uses color manipulation library [https://github.com/Qix-/color](https://github.com/Qix-/color).
 * Value for this component can be given in `string` or `object` format.
 * The callbacks always respond with color `object` format.
 */
export default class ColorPicker extends WixComponent {
  static displayName = 'ColorPicker';

  static propTypes = {
    /** Current color, can be given in `string` or `object` format [https://github.com/Qix-/color](https://github.com/Qix-/color) */
    value: oneOfType([string, object]).isRequired,

    /** Should current/previous color be displayed */
    showHistory: bool,

    /** Should `HEX`/`RGB`/`HSB` converter tabs be displayed */
    showConverter: bool,

    /** Should color input (in `HEX` mode) be displayed. This is relevant only if `showConverter` is `true` */
    showInput: bool,

    /** Handle color change event. */
    onChange: func.isRequired,

    /** Handle cancel button click */
    onCancel: func.isRequired,

    /** Handle confirm button click */
    onConfirm: func.isRequired,

    /** Children would be rendered above action buttons */
    children: node,
  };

  static defaultProps = {
    showHistory: false,
    showConverter: true,
    showInput: true,
  };

  constructor(props) {
    super(props);

    this.change = this.change.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);

    const _color = safeColor(props.value) || FALLBACK_COLOR;
    this.state = { current: _color, previous: _color };
  }

  render() {
    const {
      showHistory,
      showInput,
      showConverter,
      children,
      value,
    } = this.props;
    const { current, previous } = this.state;

    return (
      <div className={css.root}>
        <ColorPickerHsb current={current} onChange={this.change} />
        <ColorPickerHue current={current} onChange={this.change} />
        <ColorPickerHistory
          show={showHistory}
          current={current}
          previous={previous}
          onClick={this.change}
        />
        <ColorPickerConverter
          dataHook="color-picker-converter"
          showConverter={showConverter}
          showInput={showInput}
          current={current}
          onChange={this.change}
          onEnter={this.confirm}
        />
        {children && <div className={css.children}>{children}</div>}
        <ColorPickerActions
          disabled={value === ''}
          onConfirm={this.confirm}
          onCancel={this.cancel}
        />
      </div>
    );
  }

  componentWillReceiveProps(props) {
    const _color = safeColor(props.value);
    if (_color && !equal(_color, this.state.current)) {
      this.setState({ current: _color });
    }
  }

  change(_color) {
    this.setState({ current: _color }, () => {
      this.props.onChange(_color);
    });
  }

  confirm() {
    this.setState({ previous: this.state.current });
    this.props.onConfirm(this.state.current);
  }

  cancel() {
    this.props.onCancel(this.state.previous);
  }
}

function equal(color1, color2) {
  return color1.hex() === color2.hex();
}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
