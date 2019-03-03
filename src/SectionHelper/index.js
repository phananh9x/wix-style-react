import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WixComponent from '../BaseComponents/WixComponent';
import Text from '../Text';
import Button from '../Deprecated/Button';
import CloseButton from '../CloseButton';

import styles from './styles.scss';

const experimentalDark = 'experimentalDark';

export const HELPER_APPEARANCE = {
  warning: styles.warning,
  standard: styles.standard,
  danger: styles.danger,
  success: styles.success,
  premium: styles.premium,
  preview: styles.preview,
  experimentalDark: styles.experimentalDark,
};

/**
 * Used in pages where you need to explain or mention things about the content or actions
 */
class SectionHelper extends WixComponent {
  render() {
    const { showCloseButton, onClose } = this.props;

    return (
      <div
        className={classnames(
          styles.root,
          HELPER_APPEARANCE[this.props.appearance],
        )}
      >
        {showCloseButton && onClose && (
          <div
            className={classnames(styles.close, {
              [styles.closeWithTitle]: this.props.title,
            })}
          >
            <CloseButton
              dataHook="sectionhelper-close-btn"
              size="medium"
              skin={
                this.props.appearance === experimentalDark ? 'light' : 'dark'
              }
              onClick={this.props.onClose}
            />
          </div>
        )}

        {this.props.title && (
          <div className={styles.title}>
            <Text
              light={this.props.appearance === experimentalDark}
              dataHook="sectionhelper-title"
              size="small"
              weight="normal"
            >
              {this.props.title}
            </Text>
          </div>
        )}

        <div className={styles.content}>
          <Text size="small" light={this.props.appearance === experimentalDark}>
            {this.props.children}
          </Text>
        </div>

        {this.props.onAction && this.props.actionText && (
          <div className={styles.action}>
            <Button
              height="small"
              theme={
                this.props.appearance === experimentalDark
                  ? 'fullblue'
                  : 'outlined'
              }
              onClick={this.props.onAction}
              dataHook="sectionhelper-action-btn"
              children={this.props.actionText}
            />
          </div>
        )}
      </div>
    );
  }
}

SectionHelper.displayName = 'SectionHelper';

SectionHelper.propTypes = {
  /** Sets the look and feel of the component */
  appearance: PropTypes.oneOf(Object.keys(HELPER_APPEARANCE)),

  /** Adds text as the title */
  title: PropTypes.node,

  /** decide if to show the close button */
  showCloseButton: PropTypes.bool,

  /** When provided, will make a close button appear and invoke it upon click */
  onClose: PropTypes.func,

  /** When provided, will make an action button appear and invoke it upon click */
  onAction: PropTypes.func,

  /** Text label for the action button */
  actionText: PropTypes.string,

  /** Children to render */
  children: PropTypes.node,
};

SectionHelper.defaultProps = {
  showCloseButton: true,
  appearance: 'warning',
};

export default SectionHelper;
