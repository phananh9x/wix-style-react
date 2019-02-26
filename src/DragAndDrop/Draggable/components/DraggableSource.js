import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

import DragLayer from './DragLayer';
import { ItemTypes } from '../types';

/* eslint-disable new-cap */

const source = {
  beginDrag: ({
    id,
    index,
    containerId,
    groupName,
    item,
    onMoveOut,
    onDragStart,
  }) => {
    if (onDragStart) {
      onDragStart({
        id,
        index,
        containerId,
        groupName,
        item,
      });
    }
    /** we setup monitor.getItem() snapshot, so we will be always able to get info about item that we drag */
    return {
      id,
      index,
      containerId,
      groupName,
      originalIndex: index, // as index is mutable during d&d, we need another storage for original index
      originalItem: item,
      onMoveOut,
      realTime: {
        onMoveOut,
        containerId,
      },
    };
  },
  endDrag: (
    { id, index, containerId, groupName, item, onDrop, onDragEnd },
    monitor,
  ) => {
    /** if drop was called, on drop target and drag is end, then we notify parent about this */
    if (onDragEnd) {
      onDragEnd({
        id,
        index,
        containerId,
        groupName,
        item,
      });
    }

    if (monitor.getDropResult()) {
      const isSameGroup =
        groupName &&
        monitor.getItem().groupName &&
        groupName === monitor.getDropResult().groupName;
      const isSameContainer =
        containerId === monitor.getDropResult().containerId;

      if (isSameGroup || isSameContainer) {
        onDrop({
          payload: monitor.getItem().originalItem, // original item
          removedIndex: monitor.getItem().originalIndex, // original item index
          addedIndex: monitor.getItem().index, // new item index
          addedToContainerId: monitor.getDropResult().containerId, // new container for item
          removedFromContainerId: containerId, // original item container
        });
      }
    }
  },
  canDrag: ({ id, index, containerId, groupName, item, canDrag }) => {
    return canDrag
      ? canDrag({
          id,
          index,
          containerId,
          groupName,
          item,
        })
      : true;
  },
  isDragging: ({ id, containerId, groupName }, monitor) => {
    const item = monitor.getItem();
    const isSameGroup =
      groupName && item.groupName && groupName === item.groupName;
    const isSameContainer = containerId === item.containerId;
    return (isSameGroup || isSameContainer) && item.id === id;
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class DraggableSource extends React.Component {
  state = {
    offsetOfHandle: { x: 0, y: 0 },
    itemWidth: null,
  };

  rootNode = null;

  componentDidMount() {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
    this.updateDiff();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.id !== this.props.id ||
      prevProps.containerId !== this.props.containerId
    ) {
      this.updateDiff();
    }
  }

  updateDiff() {
    /* in case if we have handle, the drag will start in wrong position and we need to fix this */
    if (this.props.withHandle && this.handleNode) {
      this.setState({
        offsetOfHandle: {
          x:
            this.handleNode.getBoundingClientRect().x -
            this.rootNode.getBoundingClientRect().x,
          y:
            this.handleNode.getBoundingClientRect().y -
            this.rootNode.getBoundingClientRect().y,
        },
      });
    }
  }

  _getWrapperStyles() {
    const {
      shift,
      ignoreMouseEvents,
      animationDuration,
      animationTiming,
    } = this.props;
    const [xShift, yShift] = shift || [0, 0];
    const hasShift = xShift || yShift;

    const transition = ignoreMouseEvents
      ? `transform ${animationDuration}ms ${animationTiming}`
      : undefined;
    const transform = hasShift
      ? `translate(${xShift}px, ${yShift}px)`
      : undefined;
    const willChange = hasShift ? 'transform' : undefined;
    const pointerEvents = ignoreMouseEvents || hasShift ? 'none' : undefined;

    return {
      willChange,
      transition,
      transform,
      pointerEvents,
    };
  }

  _renderDraggableItem() {
    const {
      isDragging,
      connectDragSource,
      withHandle,
      renderItem,
      id,
      item,
      delayed,
    } = this.props;

    const content = withHandle
      ? renderItem({
          id,
          item,
          isPlaceholder: isDragging,
          connectHandle: handle => {
            const handleWithRef = React.cloneElement(handle, {
              ref: node => (this.handleNode = ReactDOM.findDOMNode(node)),
            });
            return connectDragSource(handleWithRef);
          },
          delayed,
        })
      : connectDragSource(
          renderItem({
            id,
            item,
            isPlaceholder: isDragging,
            connectHandle: noop,
            delayed,
          }),
        );

    return <div style={this._getWrapperStyles()}>{content}</div>;
  }

  _setRootNode = node => {
    // Don't need to reset the values if node remains the same
    if (node && this.rootNode !== node) {
      this.rootNode = node;
      this.setState({ itemWidth: this.rootNode.getBoundingClientRect().width });
    }
  };

  _renderPreview = ({ previewStyles }) => {
    const { renderItem, id, item, delayed } = this.props;
    return renderItem({
      id,
      item,
      previewStyles: { width: this.state.itemWidth, ...previewStyles },
      isPreview: true,
      connectHandle: noop,
      delayed,
    });
  };

  _renderPreviewItem() {
    const { id, usePortal } = this.props;
    return (
      <DragLayer
        offsetOfHandle={this.state.offsetOfHandle}
        usePortal={usePortal}
        renderPreview={this._renderPreview}
        id={id}
        // pass 'width' this prop to rerender element with changed width from state
        width={this.state.itemWidth}
        draggedType={ItemTypes.DRAGGABLE}
      />
    );
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource ? (
      <div ref={this._setRootNode}>
        {this._renderDraggableItem()}
        {this._renderPreviewItem()}
      </div>
    ) : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool, // from react-dnd
  connectDragSource: PropTypes.func, // from react-dnd
  connectDragPreview: PropTypes.func, // from react-dnd

  usePortal: PropTypes.bool,
  groupName: PropTypes.string,
  containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  withHandle: PropTypes.bool,
  onDrop: PropTypes.func,
  onMoveOut: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,

  /** visual positioning shifting for an element (transform: translate) without moving it from its real position at DOM (left, top) */
  shift: PropTypes.arrayOf(PropTypes.number),
  ignoreMouseEvents: PropTypes.bool,
  /** animation duration in ms, default = 0 - disabled */
  animationDuration: PropTypes.number,
  /** animation timing function, default = linear */
  animationTiming: PropTypes.string,
  /** callback that could prevent item from dragging */
  canDrag: PropTypes.func,
  /** Is delay timer still waiting before user can drag the item */
  delayed: PropTypes.bool,
};

export default DragSource(ItemTypes.DRAGGABLE, source, collect)(
  DraggableSource,
);
