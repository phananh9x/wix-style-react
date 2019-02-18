import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import Input from '../Input';
import InputSuffix from '../Input/InputSuffix';
import styles from './InputWithTags.scss';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import SortableList from '../SortableList/SortableList';
import defaultDndStyles from '../dnd-styles';

class InputWithTags extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this.renderReorderableTag = this.renderReorderableTag.bind(this);

    this.state = { inputValue: '', inputHasFocus: false };
  }

  componentDidMount() {
    this.props.autoFocus && this.props.onFocus();
  }

  handleClick(e) {
    this.input.focus();
    this.props.onInputClicked && this.props.onInputClicked(e);
  }

  handleInputFocus(e) {
    !this.state.inputHasFocus && this.setState({ inputHasFocus: true });
    this.props.onFocus && this.props.onFocus(e);
  }

  handleInputBlur(e) {
    this.state.inputHasFocus && this.setState({ inputHasFocus: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  render() {
    const {
      tags,
      onRemoveTag,
      onReorder,
      placeholder,
      error,
      errorMessage,
      disabled,
      delimiters,
      mode,
      ...inputProps
    } = this.props;

    const { inputHasFocus: hasFocus } = this.state;
    const isSelectMode = mode === 'select';

    const className = classNames({
      [styles.inputWithTagsContainer]: true,
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles.readOnly]: isSelectMode,
      [styles.hasFocus]: hasFocus,
      [styles.hasMaxHeight]:
        !isUndefined(this.props.maxHeight) ||
        !isUndefined(this.props.maxNumRows),
    });

    /* eslint-disable no-unused-vars */
    const {
      onManuallyInput,
      inputElement,
      closeOnSelect,
      predicate,
      onClickOutside,
      fixedHeader,
      fixedFooter,
      dataHook,
      onFocus,
      withSelection,
      onBlur,
      menuArrow,
      errorMessage: _,
      onInputClicked,
      ...desiredProps
    } = inputProps;
    const fontSize =
      desiredProps.size && desiredProps.size === 'small' ? '14px' : '16px';

    let rowMultiplier;
    if (tags.length && tags[0].size === 'large') {
      rowMultiplier = 47;
    } else {
      rowMultiplier = 35;
    }
    const maxHeight =
      this.props.maxHeight ||
      this.props.maxNumRows * rowMultiplier ||
      'initial';
    return (
      <div
        className={className}
        style={{ maxHeight }}
        onClick={() => this.handleClick()}
        data-hook={this.props.dataHook}
      >
        {onReorder ? (
          <SortableList
            contentClassName={styles.tagsContainer}
            items={tags}
            onDrop={onReorder}
            renderItem={this.renderReorderableTag}
          />
        ) : (
          tags.map(({ label, ...rest }) => (
            <Tag
              key={rest.id}
              dataHook="tag"
              disabled={disabled}
              onRemove={onRemoveTag}
              className={styles.tag}
              {...rest}
            >
              {label}
            </Tag>
          ))
        )}
        <span
          className={classNames(styles.input, {
            [styles.emptyInput]: !tags.length,
          })}
          data-hook="inner-input-with-tags"
        >
          <div className={styles.hiddenDiv} style={{ fontSize }}>
            {this.state.inputValue}
          </div>

          <Input
            width={this.props.width}
            ref={input => (this.input = input)}
            onFocus={e => this.handleInputFocus(e)}
            onBlur={e => this.handleInputBlur(e)}
            placeholder={tags.length === 0 ? placeholder : ''}
            {...desiredProps}
            dataHook="inputWithTags-input"
            disabled={disabled}
            readOnly={isSelectMode}
            onChange={e => {
              if (!delimiters.includes(e.target.value)) {
                this.setState({ inputValue: e.target.value });
                desiredProps.onChange && desiredProps.onChange(e);
              }
            }}
            withSelection
          />
        </span>

        {(isSelectMode || error) && (
          <div className={styles.inputSuffix}>
            <InputSuffix
              disabled={disabled}
              status={error && 'error'}
              statusMessage={errorMessage}
              menuArrow={isSelectMode}
            />
          </div>
        )}
      </div>
    );
  }

  renderReorderableTag({
    item: { id, label, ...itemProps },
    previewStyles,
    isPlaceholder,
    isPreview,
    ...rest
  }) {
    const { onRemoveTag, disabled } = this.props;
    const classes = classNames(styles.tag, {
      [defaultDndStyles.itemPlaceholder]: isPlaceholder,
      [styles.draggedTagPlaceholder]: isPlaceholder,
      [defaultDndStyles.itemPreview]: isPreview,
      [styles.draggedTag]: isPreview,
    });

    return (
      <div style={previewStyles}>
        <Tag
          id={id}
          dataHook="tag"
          disabled={disabled}
          className={classes}
          onRemove={onRemoveTag}
          {...itemProps}
          {...rest}
        >
          {label}
        </Tag>
      </div>
    );
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  clear() {
    this.input.clear();
  }
}

InputWithTags.propTypes = {
  onRemoveTag: PropTypes.func,
  tags: PropTypes.array,
  onReorder: PropTypes.func,
  maxHeight: PropTypes.string,
  maxNumRows: PropTypes.number,
  onKeyDown: PropTypes.func,
  dataHook: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInputClicked: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.oneOf(['select']),
  delimiters: PropTypes.array,
  width: PropTypes.string,
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: '',
  delimiters: [],
};

export default InputWithTags;
