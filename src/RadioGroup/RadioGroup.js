import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';

import RadioButton from './RadioButton/RadioButton';
import deprecationLog from '../utils/deprecationLog';
import styles from './RadioGroup.scss';
import WixComponent from '../BaseComponents/WixComponent';

/**
 * component for easy radio group creation.
 *
 * similar to HTML `<input type="radio"/>` except you don't need to handle `name` or click handlers
 */
class RadioGroup extends WixComponent {
  constructor(props) {
    super(props);
    this.name = uniqueId('RadioGroup_');
    this.logDeprecations(props);
  }

  logDeprecations(props) {
    if (props.type === 'button') {
      deprecationLog(
        `RadioGroup's prop "type" with value "button" is deprecated. Use 'SegmentedToggle' component instead.`,
      );
    }
  }
  render() {
    const {
      onChange,
      disabled,
      disabledRadios,
      value,
      vAlign,
      display,
      type,
      spacing,
      lineHeight,
    } = this.props;
    return (
      <div
        className={classNames(styles[display], {
          [styles.buttonType]: type === 'button',
        })}
      >
        {React.Children.map(this.props.children, (radio, index) => (
          <RadioGroup.Radio
            dataHook={radio.props.dataHook}
            value={radio.props.value}
            name={this.name}
            onChange={onChange}
            vAlign={vAlign}
            type={type}
            disabled={
              disabled || disabledRadios.indexOf(radio.props.value) !== -1
            }
            checked={radio.props.value === value}
            style={
              display === 'vertical' && index > 0 ? { marginTop: spacing } : {}
            }
            icon={radio.props.icon}
            lineHeight={lineHeight}
            content={radio.props.content}
          >
            {radio.props.children}
          </RadioGroup.Radio>
        ))}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  /** Callback function when user selects a different value */
  onChange: PropTypes.func,

  /** Selected radio button value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** the values of the disabled radio buttons */
  disabledRadios: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

  /** Positioning of the radio bottom compared to the label */
  vAlign: PropTypes.oneOf(['center', 'top']),

  /** Make the entire control disabled */
  disabled: PropTypes.bool,

  /** Decided which type of child controls to render */
  type: PropTypes.oneOf(['default', 'button']),

  /** Display direction of the radios */
  display: PropTypes.oneOf(['vertical', 'horizontal']),

  children: PropTypes.arrayOf((propValue, key) => {
    if (propValue[key].type.displayName !== RadioButton.displayName) {
      return new Error(
        `RadioGroup: Invalid Prop children was given. Validation failed on child number ${key}`,
      );
    }
  }),

  /** Vertical spacing between radio buttons */
  spacing: PropTypes.string,

  lineHeight: PropTypes.string,
};

RadioGroup.defaultProps = {
  disabledRadios: [],
  onChange: () => {},
  value: '',
  vAlign: 'center',
  display: 'vertical',
  spacing: '12px',
  lineHeight: '24px',
  type: 'default',
};

RadioGroup.Radio = RadioButton;

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
