import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import defaultDndStyles from 'wix-style-react/dnd-styles';
import DragDropContextProvider from 'wix-style-react/DragDropContextProvider';
import styles from './MultiAreaList.scss';

const generateStateForContainer = (length, startIndex) => {
  const res = [];
  for (let i = 0; i < length; i++) {
    res.push({
      id: 'item' + (startIndex + i),
      text: `Drag object ${startIndex + i}`,
    });
  }
  return res;
};

const copy = value => JSON.parse(JSON.stringify(value));

/**
 * An example multi list dnd.
 */
export default class MultiAreaList extends React.Component {
  state = {
    multiArea1: generateStateForContainer(4, 1),
    multiArea2: generateStateForContainer(4, 5),
  };

  handleDrop = ({
    removedIndex,
    addedIndex,
    removedFromContainerId,
    addedToContainerId,
    payload,
  }) => {
    const nextState = copy(this.state);
    nextState[removedFromContainerId].splice(removedIndex, 1);
    nextState[addedToContainerId].splice(addedIndex, 0, payload);

    this.setState({ ...nextState });
  };

  renderItem = ({ isPlaceholder, isPreview, id, item, previewStyles }) => {
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
      },
      classNames(defaultDndStyles.item, styles.item),
    );

    return (
      <div className={classes} style={previewStyles} data-hook={`item-${id}`}>
        {item.text}
      </div>
    );
  };

  render() {
    return (
      <DragDropContextProvider>
        <div className={styles.root}>
          <SortableList
            className={classNames(defaultDndStyles.list, styles.list)}
            dataHook="list-multi-area"
            groupName="multi-area"
            containerId="multiArea1"
            items={this.state.multiArea1}
            renderItem={this.renderItem}
            onDrop={this.handleDrop}
          />
          <SortableList
            className={classNames(defaultDndStyles.list, styles.list)}
            dataHook="list-multi-area"
            groupName="multi-area"
            containerId="multiArea2"
            items={this.state.multiArea2}
            renderItem={this.renderItem}
            onDrop={this.handleDrop}
          />
        </div>
      </DragDropContextProvider>
    );
  }
}
