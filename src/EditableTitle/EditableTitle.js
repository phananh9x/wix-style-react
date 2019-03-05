import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Heading from '../Heading';
import Input from '../Input/Input';
import styles from './EditableTitle.scss';

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      value: props.initialValue,
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { dataHook, className } = this.props;

    const conditionalClasses = {
      [styles.hasFocus]: this.state.focus,
    };

    return (
      <div
        className={classNames(conditionalClasses, styles.root, className)}
        data-hook={dataHook}
      >
        <div
          onClick={() => {
            if (!this.state.value && this.props.defaultValue) {
              this.setState({ value: this.props.defaultValue });
            }
            this.setState({ focus: true }, () => this.wsrInput.focus());
          }}
          data-hook="heading"
          className={classNames({
            [styles.headerIsRenaming]: this.state.focus,
            [styles.heading]: !this.state.focus,
            [styles.placeholder]: !this.state.value && this.props.defaultValue,
          })}
        >
          <Heading ellipsis>
            {this.state.value || this.props.defaultValue}
          </Heading>
        </div>
        <div
          className={classNames({
            [styles.activationIndicatorHasFocus]: this.state.focus,
            [styles.activationIndicator]: !this.state.focus,
          })}
        >
          {this.state.value || this.props.defaultValue}
        </div>
        <div
          className={classNames({
            [styles.renamingInput]: this.state.focus,
            [styles.hiddenInput]: !this.state.focus,
          })}
          style={{ position: 'absolute', zIndex: 1, width: '100%' }}
        >
          <Input
            dataHook="renaming-field"
            className={styles.nbinput}
            textOverflow="clip"
            maxLength={524288}
            onChange={this.onChange}
            value={this.state.value}
            ref={wsrInput => (this.wsrInput = wsrInput)}
            onFocus={e => {
              this.setState({ focus: true });
              if (typeof this.props.onFocus === 'function') {
                this.props.onFocus(e);
              }
            }}
            onBlur={e => {
              if (!this.state.value) {
                this.setState({ value: this.props.defaultValue });
              }
              this.setState({ focus: false });
              if (typeof this.props.onBlur === 'function') {
                this.props.onBlur(e);
              }
              if (typeof this.props.onComplete === 'function') {
                this.props.onComplete(this.state.value);
              }
            }}
          />
        </div>
      </div>
    );
  }
}

EditableTitle.displayName = 'EditableTitle';

EditableTitle.defaultProps = {
  initialValue: '',
};

EditableTitle.propTypes = {
  /** Value - initial value to display */
  initialValue: PropTypes.string,
  /** default - value to display when empty, when clicked the input gets this value */
  defaultValue: PropTypes.string,
  /** onComplete - invoked when done editing */
  onComplete: PropTypes.func,
  /** onFocus - when focusing the input */
  onFocus: PropTypes.func,
  /** onBlur - when blurring the input */
  onBlur: PropTypes.func,
  /** disabled - when input is disabled */
  disabled: PropTypes.bool,
};

export default EditableTitle;
