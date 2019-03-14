import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../Label';
import Tooltip from '../Tooltip';
import Text, { SKINS } from '../Text';

import InfoIcon from '../common/InfoIcon';
import styles from './FormField.scss';

const labelPlacements = {
  top: 'top',
  right: 'right',
  left: 'left',
};

const asterisk = (
  <div
    data-hook="formfield-asterisk"
    className={styles.asterisk}
    children="*"
  />
);

const charactersLeft = lengthLeft => {
  const colorProps =
    lengthLeft >= 0 ? { light: true, secondary: true } : { skin: SKINS.error };
  return (
    <Text
      size="small"
      weight="normal"
      {...colorProps}
      data-hook="formfield-counter"
      className={styles.counter}
      children={lengthLeft}
    />
  );
};

class FormField extends React.Component {
  static displayName = 'FormField';
  static propTypes = {
    /**
     * any kids to render, should be some form of input. Input, InputArea & RichTextArea work well
     *
     * `children` can be React node or a function
     *
     * when function, it receives object with:
     * * `setCharactersLeft` - function accepts a number and will display it on top right of `FormField` component
     *
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /** Defines if the content (children container) grows when there's space available (otherwise, it uses the needed space only) */
    stretchContent: PropTypes.bool,

    /** optional text labeling this form field */
    label: PropTypes.node,

    /** setting label size (small, medium) */
    labelSize: PropTypes.string,

    labelPlacement: PropTypes.oneOf([
      labelPlacements.top,
      labelPlacements.right,
      labelPlacements.left,
    ]),

    /** whether to display an asterisk (*) or not */
    required: PropTypes.bool,

    /** display info icon with tooltip. Node from this prop is content of tooltip */
    infoContent: PropTypes.node,

    /** info icon tooltip props */
    infoTooltipProps: PropTypes.shape(Tooltip.propTypes),

    /** string used to match text label with FormField children. For example:
     *
     * ```js
     * <FormField id="myFormField" label="Hello">
     *   <Input id="myFormField"/>
     * </FormField>
     * ```
     */
    id: PropTypes.string,

    /** used for testing */
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    labelSize: 'medium',
    required: false,
    stretchContent: true,
    labelPlacement: labelPlacements.top,
  };

  state = {
    lengthLeft: undefined,
  };

  childrenRenderPropInterface = {
    setCharactersLeft: lengthLeft => this.setState({ lengthLeft }),
  };

  renderChildren() {
    const { children } = this.props;
    if (typeof children === 'function') {
      return children(this.childrenRenderPropInterface);
    }

    return children;
  }

  _hasCharCounter = () => typeof this.state.lengthLeft === 'number';

  _renderInfoIcon = () => {
    const { infoContent, infoTooltipProps } = this.props;
    return (
      infoContent && (
        <InfoIcon
          dataHook="formfield-infoicon"
          className={styles.infoIcon}
          tooltipProps={{
            content: infoContent,
            ...infoTooltipProps,
            dataHook: 'formfield-infotooltip',
          }}
        />
      )
    );
  };

  _renderInlineSuffixes = () => {
    const { label, required, id, children } = this.props;

    return (
      <div
        data-hook="formfield-inline-suffixes"
        className={classnames(styles.suffixesInline, {
          [styles.minLabelHeight]: !children,
          [styles.inlineWithCharCounter]: this._hasCharCounter(),
        })}
      >
        <Label
          appearance="T1"
          children={label}
          for={id}
          data-hook="formfield-label"
        />
        {required && asterisk}
        {this._renderInfoIcon()}
      </div>
    );
  };

  _hasInlineLabel = (label, labelPlacement) =>
    label &&
    (labelPlacement === labelPlacements.left ||
      labelPlacement === labelPlacements.right);

  render() {
    const {
      label,
      labelPlacement,
      required,
      infoContent,
      dataHook,
      id,
      children,
      stretchContent,
      labelSize,
    } = this.props;
    const { lengthLeft } = this.state;

    return (
      <div
        data-hook={dataHook}
        className={classnames(styles.root, {
          [styles.labelFromTop]:
            label && labelPlacement === labelPlacements.top,
          [styles.labelFromLeft]:
            label && labelPlacement === labelPlacements.left,
          [styles.labelFromRight]:
            label && labelPlacement === labelPlacements.right,
          [styles.stretchContent]: stretchContent,
        })}
      >
        {label && labelPlacement === labelPlacements.top && (
          <div
            className={classnames(styles.label, {
              [styles.minLabelHeight]: !children,
            })}
          >
            <Label
              appearance="T1"
              size={labelSize}
              children={label}
              for={id}
              data-hook="formfield-label"
            />

            {required && asterisk}
            {this._renderInfoIcon()}
            {this._hasCharCounter() && charactersLeft(lengthLeft)}
          </div>
        )}

        {children && (
          <div
            data-hook="formfield-children"
            className={classnames(styles.children, {
              [styles.childrenWithInlineSuffixes]:
                !label || this._hasInlineLabel(label, labelPlacement),
            })}
          >
            {(!label || labelPlacement !== labelPlacements.top) &&
              this._hasCharCounter() &&
              charactersLeft(lengthLeft)}
            {this.renderChildren()}
          </div>
        )}

        {!label && (required || infoContent) && this._renderInlineSuffixes()}

        {this._hasInlineLabel(label, labelPlacement) &&
          this._renderInlineSuffixes()}
      </div>
    );
  }
}

export default FormField;
