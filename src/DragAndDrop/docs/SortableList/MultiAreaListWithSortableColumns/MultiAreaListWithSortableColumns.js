import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import defaultDndStyles from 'wix-style-react/dnd-styles';
import DragDropContextProvider from 'wix-style-react/DragDropContextProvider';
import styles from './MultiAreaListWithSortableColumns.scss';

const generateStateForContainer = (length, startIndex) => {
  const res = [];
  for (let i = 0; i < length; i++) {
    res.push({
      id: 'item-new' + (startIndex + i),
      text: `Drag object ${startIndex + i}`,
    });
  }
  return res;
};

const copy = value => JSON.parse(JSON.stringify(value));

/**
 * An example multi list dnd.
 */
export default class MultiAreaListWithSortableColumns extends React.Component {
  state = {
    columns: [
      {
        id: 'multiArea1',
        items: generateStateForContainer(4, 1),
        width: 250,
      },
      {
        id: 'multiArea2',
        items: generateStateForContainer(4, 5),
        width: 300,
      },
    ],
  };

  handleDropCell = ({
    removedIndex,
    addedIndex,
    removedFromContainerId,
    addedToContainerId,
    payload,
  }) => {
    const nextState = copy(this.state);
    nextState.columns
      .find(li => li.id === removedFromContainerId)
      .items.splice(removedIndex, 1);
    nextState.columns
      .find(li => li.id === addedToContainerId)
      .items.splice(addedIndex, 0, payload);

    this.setState({ ...nextState });
  };

  handleDropColumn = ({ removedIndex, addedIndex, payload }) => {
    const nextState = copy(this.state);
    nextState.columns.splice(removedIndex, 1);
    nextState.columns.splice(addedIndex, 0, payload);

    this.setState({ ...nextState });
  };

  renderCell = ({
    isPlaceholder,
    isPreview,
    id,
    item,
    previewStyles,
    isListInDragState,
  }) => {
    const classes = classNames(
      {
        [classNames(
          defaultDndStyles.itemPlaceholder,
          styles.itemPlaceholder,
        )]: isPlaceholder,
        [classNames(
          defaultDndStyles.itemPreview,
          styles.itemPreview,
        )]: isPreview,
        [styles.isListInDragState]: isListInDragState,
      },
      classNames(defaultDndStyles.item, styles.item),
    );

    return (
      <div className={classes} style={previewStyles} data-hook={`item-${id}`}>
        {item.text}
      </div>
    );
  };

  renderColumn = ({ isPlaceholder, isPreview, item, id, previewStyles }) => {
    const classes = classNames(
      {
        [classNames(
          defaultDndStyles.itemPlaceholder,
          styles.columnPlaceholder,
        )]: isPlaceholder,
        [classNames(
          defaultDndStyles.itemPreview,
          styles.columnItemPreview,
        )]: isPreview,
      },
      classNames(defaultDndStyles.item, styles.columnItem),
    );

    const { width, items } = item;

    return (
      <div
        className={classes}
        style={{ ...previewStyles, width }}
        data-hook={`column-${id}`}
      >
        <SortableList
          dragPreview={isPreview}
          className={classNames(defaultDndStyles.list, styles.column)}
          dataHook={`column-${id}`}
          groupName="multi-area"
          containerId={id}
          items={items}
          renderItem={this.renderCell}
          onDrop={this.handleDropCell}
        />
      </div>
    );
  };

  render() {
    return (
      <DragDropContextProvider>
        <div className={styles.root}>
          <SortableList
            className={classNames(defaultDndStyles.list, styles.table)}
            contentClassName={styles.content}
            dataHook="draggable-column-multi-area"
            containerId="multiArea"
            items={this.state.columns}
            renderItem={this.renderColumn}
            onDrop={this.handleDropColumn}
          />
        </div>
      </DragDropContextProvider>
    );
  }
}
