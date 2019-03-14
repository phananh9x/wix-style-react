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
      value: props.initialValue || '',
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  showPlaceholder = () => !this.state.value && this.props.defaultValue;

  onFocus = () => {
    if (!this.state.value && this.props.defaultValue) {
      this.setState({ value: this.props.defaultValue });
    }
    this.setState({ focus: true }, () => this.wsrInput.focus());
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
        tabIndex={0}
        onFocus={this.onFocus}
      >
        <div
          onClick={this.onFocus}
          data-hook="heading"
          className={classNames(
            {
              [styles.headerIsRenaming]:
                this.state.focus && !this.showPlaceholder(),
              [styles.placeholder]: this.showPlaceholder(),
            },
            styles.heading,
          )}
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
          data-hook="renaming-field"
        >
          <Input
            className={styles.nbinput}
            textOverflow="clip"
            maxLength={524288}
            onChange={this.onChange}
            value={this.state.value}
            ref={wsrInput => (this.wsrInput = wsrInput)}
            onFocus={() => {
              this.setState({ focus: true });
            }}
            onBlur={this.onValueSubmission}
            onEnterPressed={this.onValueSubmission}
          />
        </div>
      </div>
    );
  }

  onValueSubmission = () => {
    if (!this.state.value) {
      this.setState({ value: this.props.defaultValue });
    }
    this.setState({ focus: false });
    if (typeof this.props.onValueSubmission === 'function') {
      this.props.onValueSubmission(this.state.value);
    }
  };
}

EditableTitle.displayName = 'EditableTitle';

EditableTitle.propTypes = {
  /** Value - initial value to display */
  initialValue: PropTypes.string,
  /** default - value to display when empty, when clicked the input gets this value */
  defaultValue: PropTypes.string,
  /** onValueSubmission - invoked when done editing */
  onValueSubmission: PropTypes.func,
};

export default EditableTitle;
