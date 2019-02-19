import React from 'react';
import WixComponent from '../../../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { dragCoordinates } from '../DragUtils';
import { ItemTypes } from '../types';

/* eslint-disable new-cap */

const getRelativePositions = (child, parent) => {
  const topPositionOfChild =
    child.getBoundingClientRect().top - parent.getBoundingClientRect().top;
  const bottomPositionOfChild =
    topPositionOfChild + child.getBoundingClientRect().height;

  return {
    top: topPositionOfChild,
    bottom: bottomPositionOfChild,
  };
};

const target = {
  drop(props, monitor) {
    /** if drop was already done(on child), we skip this drop call */
    if (monitor.getDropResult()) {
      return;
    }
    return {
      containerId: props.containerId,
      groupName: props.groupName,
      index: monitor.getItem().index,
    };
  },
  hover(props, monitor, component) {
    if (!component) {
      return;
    }
    /**
      in this block we check that user dragging item over container empty pars
      and not over other draggable(sortable items)
    */
    const { top, bottom } = getRelativePositions(
      component.childNode,
      component.rootNode,
    );
    const { hoverClientY } = dragCoordinates({ monitor, component });
    const isHoverInBannedArea =
      (hoverClientY > top && hoverClientY < bottom) || !monitor.isOver();
    if (isHoverInBannedArea) {
      return;
    }
    /** end of block */

    /**
      in this block we check, that user dragging item(from some container with group)
      over container with same group
    */
    const monitorItem = monitor.getItem();
    const isSameGroup =
      props.groupName &&
      monitorItem.groupName &&
      props.groupName === monitorItem.groupName;
    if (!isSameGroup || !component) {
      return;
    }
    /** end of block */
    const dragIndex = monitorItem.index; // position of item that we drag in items array
    const hoverIndex = hoverClientY < top ? 0 : props.total; // if user drag item above other items - add to the top, otherwise - add to the bottom
    const isSameContainer =
      props.containerId === monitorItem.realTime.containerId; // check do we hover over same container(from which item is)

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
    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget(ItemTypes.DRAGGABLE, target, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
class Container extends WixComponent {
  setRootRef = node => (this.rootNode = node);
  setChildRef = node => (this.childNode = node);

  render() {
    if (!this.props.connectDropTarget) {
      return null;
    }
    return this.props.connectDropTarget(
      <div className={this.props.className} ref={this.setRootRef}>
        {React.cloneElement(this.props.children, { ref: this.setChildRef })}
      </div>,
    );
  }
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  containerId: PropTypes.string,
  groupName: PropTypes.string,
  index: PropTypes.number,
  onMoveOut: PropTypes.func,
  onHover: PropTypes.func,
};

export default Container;
