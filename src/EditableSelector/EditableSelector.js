import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Selector from '../Selector';
import Text from '../Text';
import Button from '../Button';
import IconButton from '../IconButton';
import EditableRow from './EditableRow/EditableRow';
import styles from './EditableSelector.scss';
import Add from '../new-icons/Add';
import Delete from '../new-icons/Delete';
import TextLink from '../Deprecated/TextLink';

class EditableSelector extends WixComponent {
  static propTypes = {
    title: PropTypes.string,
    toggleType: PropTypes.oneOf(['checkbox', 'radio']),
    newRowLabel: PropTypes.string,
    editButtonText: PropTypes.string,
    onOptionAdded: PropTypes.func,
    onOptionEdit: PropTypes.func,
    onOptionDelete: PropTypes.func,
    onOptionToggle: PropTypes.func,
    options: PropTypes.array,
  };

  static defaultProps = {
    toggleType: 'checkbox',
    newRowLabel: 'New Row',
    editButtonText: 'Edit',
  };

  state = {
    addingNewRow: false,
    editingRow: null,
  };

  addNewRow = () => {
    this.setState({ addingNewRow: true, editingRow: false });
  };

  editItem = index => {
    this.setState({ editingRow: index, addingNewRow: false });
  };

  deleteItem = index => {
    this.props.onOptionDelete && this.props.onOptionDelete({ index });
  };

  onNewOptionApprove = ({ newTitle, index }) => {
    if (this.state.addingNewRow) {
      this.props.onOptionAdded && this.props.onOptionAdded({ newTitle });
    } else {
      this.props.onOptionEdit && this.props.onOptionEdit({ newTitle, index });
    }
    this.setState({
      addingNewRow: false,
      editingRow: null,
    });
  };

  onNewOptionCancel = () => {
    this.setState({
      addingNewRow: false,
      editingRow: null,
    });
  };

  onOptionToggle = id => {
    this.props.onOptionToggle && this.props.onOptionToggle(id);
  };

  renderInput = (title, index) => {
    return (
      <EditableRow
        key={index}
        dataHook="edit-row-wrapper"
        onApprove={newTitle => this.onNewOptionApprove({ newTitle, index })}
        onCancel={() => this.onNewOptionCancel()}
        newOption={title}
      />
    );
  };

  render() {
    const { title, newRowLabel, editButtonText, toggleType } = this.props;
    let { options } = this.props;
    options = options || [];
    return (
      <div>
        {title && (
          <div className={styles.title} data-hook="editable-selector-title">
            <Text weight="normal">{title}</Text>
          </div>
        )}
        <div>
          {options.map((option, index) =>
            this.state.editingRow === index ? (
              this.renderInput(option.title, index)
            ) : (
              <div
                data-hook="editable-selector-row"
                className={styles.row}
                key={index}
              >
                <Selector
                  dataHook="editable-selector-item"
                  id={index}
                  title={option.title}
                  isSelected={option.isSelected}
                  toggleType={toggleType}
                  onToggle={id => this.onOptionToggle(id)}
                />
                <div className={styles.optionMenu}>
                  <IconButton
                    onClick={() => this.deleteItem(index)}
                    dataHook="delete-item"
                    type="button"
                    size="small"
                    skin="inverted"
                  >
                    <span>
                      <Delete />
                    </span>
                  </IconButton>
                  <div className={styles.editRow}>
                    <Button
                      onClick={() => this.editItem(index)}
                      dataHook="edit-item"
                      size="small"
                    >
                      {editButtonText}
                    </Button>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
        {this.state.addingNewRow && this.renderInput()}
        <div className={styles.newRowButton}>
          <TextLink
            underlineStyle="never"
            onClick={() => this.addNewRow()}
            dataHook="new-row-button"
          >
            <span className={styles.textLinkWithPrefix}>
              <Add className={styles.icon} />
              <span className={styles.text} data-hook="new-row-button-text">
                {newRowLabel}
              </span>
            </span>
          </TextLink>
        </div>
      </div>
    );
  }
}

EditableSelector.displayName = 'EditableSelector';

export default EditableSelector;
