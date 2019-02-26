import React from 'react';
import PropTypes from 'prop-types';

import shallowEqual from 'shallowequal';

import DraggableSource from './components/DraggableSource';
import DraggableTarget from './components/DraggableTarget';

export class Draggable extends React.Component {
  state = {
    delayed: false,
  };
  delayTimer = null;

  shouldComponentUpdate(
    { listOfPropsThatAffectItems, ...nextProps },
    nextState,
  ) {
    const {
      listOfPropsThatAffectItems: prevListOfPropsThatAffectItems,
      ...prevProps
    } = this.props;

    if (
      !shallowEqual(nextProps, prevProps) ||
      !shallowEqual(listOfPropsThatAffectItems, prevListOfPropsThatAffectItems)
    ) {
      return true;
    }
    if (!shallowEqual(nextState, this.state)) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.resetDelayTimer();
  }

  resetDelayState = () => {
    if (!!this.props.delay) {
      this.setState({ delayed: false });
      this.resetDelayTimer();
    }
  };

  resetDelayTimer = () => {
    clearTimeout(this.delayTimer);
    this.delayTimer = null;
  };

  countDelay = () => {
    if (!!this.props.delay) {
      this.setState({ delayed: true });
      this.resetDelayTimer();

      this.delayTimer = setTimeout(
        () => this.setState({ delayed: false }),
        this.props.delay,
      );
    }
  };

  onDragStart = ({ id, index, containerId, groupName, item }) => {
    if (this.props.onDragStart) {
      this.props.onDragStart({ id, index, containerId, groupName, item });
    }

    this.resetDelayTimer();
  };

  onDragEnd = ({ id, index, containerId, groupName, item }) => {
    if (this.props.onDragEnd) {
      this.props.onDragEnd({ id, index, containerId, groupName, item });
    }

    this.resetDelayState();
  };

  canDrag = ({ id, index, containerId, groupName, item }) => {
    const canDragByDelay = !!this.props.delay ? !this.state.delayed : true;
    const propsCanDrag = this.props.canDrag
      ? this.props.canDrag({
          id,
          index,
          containerId,
          groupName,
          item,
        })
      : true;

    if (!canDragByDelay) {
      this.resetDelayState();
    }

    return canDragByDelay && propsCanDrag;
  };

  render() {
    const { hasDragged, ...restProps } = this.props;
    return (
      <DraggableTarget {...restProps}>
        <div
          onMouseDown={this.countDelay}
          onMouseUp={this.resetDelayState}
          data-hook="delay-wrapper"
        >
          <DraggableSource
            {...restProps}
            ignoreMouseEvents={hasDragged}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            canDrag={this.canDrag}
            delayed={!!this.props.delay && this.state.delayed}
          />
        </div>
      </DraggableTarget>
    );
  }
}

Draggable.propTypes = {
  /** decide whether to render a handle using `connectHandle` (see below) */
  withHandle: PropTypes.bool,
  /** uniq id of container that contain current draggable item */
  containerId: PropTypes.string,
  /* name of group between inside of each dnd is allowed */
  groupName: PropTypes.string,
  /* custom renderer for item */
  renderItem: PropTypes.func,
  /* position of item in container items array */
  index: PropTypes.number,
  /* uniq id of an item */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /* model that represent item */
  item: PropTypes.object,
  /** callback when item was moved out from current container to another container */
  onMoveOut: PropTypes.func,
  /** callback when item was dropped in a new location */
  onDrop: PropTypes.func,
  /** callback when item is hovered*/
  onHover: PropTypes.func,
  /** callback for drag start */
  onDragStart: PropTypes.func,
  /** callback for drag end */
  onDragEnd: PropTypes.func,

  /** visual positioning shifting for an element (transform: translate) without moving it from its real position at DOM (left, top) */
  shift: PropTypes.arrayOf(PropTypes.number),
  /** flag that indicates that there's an item being dragged */
  hasDragged: PropTypes.bool,
  /** sets draggable item node & additional info for animation positions calculations */
  setWrapperNode: PropTypes.func,
  /** animation duration in ms, default = 0 - disabled */
  animationDuration: PropTypes.number,
  /** animation timing function, default = linear */
  animationTiming: PropTypes.string,
  /** callback that could prevent item from dragging */
  canDrag: PropTypes.func,

  delay: PropTypes.number,
  /** 
    In case that you are using some external props inside of renderItems method,
    you need to define them here.

    renderItem = ({ item }) => <div key={item.id}>{this.props.myAwesomeProp}</div>

    render() {
      return (
        <SortableList
          ...
          listOfPropsThatAffectItems={[this.props.myAwesomeProp]}
        />
      )
    }
  */
  listOfPropsThatAffectItems: PropTypes.array,
};

export default Draggable;
