import React from 'react';
import WixComponent from '../../../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../types';

/* eslint-disable new-cap */

const target = {
  drop(props, monitor) {
    /** if drop was already done(on child), we skip this drop call */
    if (monitor.getDropResult()) {
      return;
    }
    /**
      after drop released we send containerId and index of dropped item to dropResult,
      so endDrag inside of drag source can use this data
    */
    return {
      containerId: props.containerId,
      index: props.index,
      groupName: props.groupName,
    };
  },
  hover(props, monitor, component) {
    const monitorItem = monitor.getItem();
    const dragIndex = monitorItem.index; // position of item that we drag
    const hoverIndex = props.index; // position of item that we hover(want to put draggable item on it)
    const isSameGroup =
      props.groupName &&
      monitorItem.groupName &&
      props.groupName === monitorItem.groupName; // check that items from same group
    const isSameContainer =
      props.containerId === monitorItem.realTime.containerId; // check that items from same container
    /** in case that item not in same group and not from same container - do nothing */
    if (!isSameContainer && !isSameGroup) {
      return;
    }
    /** in case that we hover over itself - do nothing */
    if (!component || (hoverIndex === dragIndex && isSameContainer)) {
      return;
    }
    /**
      if item is from same group but different container, thats mean that we move item
      from one container to another, and we need to move out item from previous container
    */
    if (isSameGroup && !isSameContainer) {
      monitorItem.realTime.onMoveOut(monitorItem.id);
    }
    /**
      as react-dnd store same snapshot in monitor(so containerId of item will be same, even if we moved it with hover to another container)
      after any hovers, we need to save also real position of monitor, with real links to current container
    */
    monitorItem.realTime.onMoveOut = props.onMoveOut;
    monitorItem.realTime.containerId = props.containerId;
    /**
      call callback, to ask parent to do some action, for example swap items or add new one,
      we send original position of item and new one, also id of item and original item state(
        it required for case, when we moving item from 1 container to another
      )
    */
    props.onHover({
      removedIndex: dragIndex,
      addedIndex: hoverIndex,
      id: monitorItem.id,
      item: monitorItem.originalItem,
    });
    /** set new index for item */
    monitorItem.index = hoverIndex;
  },
};

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

class DraggableTarget extends WixComponent {
  registerNode = node => {
    this.props.setWrapperNode(node, this.props.index, this.props.item);
  };

  render() {
    if (!this.props.connectDropTarget) {
      return null;
    }
    return this.props.connectDropTarget(
      <div ref={this.registerNode}>{this.props.children}</div>,
    );
  }
}

DraggableTarget.propTypes = {
  children: PropTypes.any,
  connectDropTarget: PropTypes.func, // from react-dnd
  containerId: PropTypes.string,
  groupName: PropTypes.string,
  index: PropTypes.number,
  onMoveOut: PropTypes.func,
  onHover: PropTypes.func,
  setWrapperNode: PropTypes.func,
  item: PropTypes.object,
};

export default DropTarget(ItemTypes.DRAGGABLE, target, collect)(
  DraggableTarget,
);
