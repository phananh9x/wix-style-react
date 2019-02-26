import React from 'react';
import PropTypes from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import { Draggable } from '../DragAndDrop/Draggable';
import Container from '../DragAndDrop/Draggable/components/Container';

import times from '../utils/operators/times';
import withDNDContext from './withDNDContext';

/**
 * Attaches Drag and Drop behavior to a list of items
 */
class SortableList extends WixComponent {
  static defaultProps = {
    animationDuration: 0,
    animationTiming: '',
  };

  state = {
    items: this.props.items || [],
    animationShifts: {},
    draggedId: null,
  };

  wrapperNodes = [];

  setWrapperNode = (node, index, item) => {
    this.wrapperNodes[index] = { node, index, item };
  };

  reSetAnimationState = (overrides = {}) => {
    this.setState({ animationShifts: {}, draggedId: null, ...overrides });
  };

  componentWillReceiveProps({ items }) {
    // We clear state on drag end if element was dragged from another list,
    // `onDragEnd` will be called on "source" list, not "taget" one.
    this.reSetAnimationState({ items: items ? items : this.state.items });
  }

  handleMoveOut = id => {
    this.reSetAnimationState({
      items: this.state.items.filter(it => it.id !== id),
    });
    this.wrapperNodes = this.wrapperNodes.filter(({ item }) => item.id !== id);
  };

  /**
   * Calculates shifts (offsets) for every item that needs to be moved
   * @param {number} originalIndex Draggable item source index
   * @param {number} moveToIndex New index where is currently draggable item should appear
   * @param {boolean} shiftForward is shifting to forward position
   * @sample
   *  We have three nodes @ DOM:
   *  Item1 has position {top1, left1, bottom1, right1}
   *  Item2 has position {top2, left2, bottom2, right2}
   *  Item3 has position {top3, left3, bottom3, right3}
   *  When we're dragging Item2 to replace Item1 we have:
   *    originalIndex: 1
   *    moveToIndex: 0
   *    shiftForward: false
   *  Item2's placeholder should be animated to Item1's position
   *  Item1's container should be animated to Item2's position
   *  To be sure that new position is correct we should relay our calculations on moving direction:
   *    When we're dragging item to the top, another shifting items should be visually moved to difference of their bottom positions (it means a height of current item, but with its margins)
   *    When we're dragging item to the bottom, another shifting items should be visually moved to difference of their top positions (it means a height of current item, but with its margins)
   *  Same logic exists for horizontals sortable lists and all calculations are based on differences between left or right positions
   */
  getAnimationShifts = (originalIndex, moveToIndex, shiftForward) => {
    const animationShifts = {};

    const minIndex = Math.min(originalIndex, moveToIndex);
    const maxIndex = Math.max(originalIndex, moveToIndex);

    const previousNodeIndex = originalIndex + (shiftForward ? 1 : -1);
    const { node } = this.wrapperNodes[originalIndex] || {};
    const { node: prevNode } = this.wrapperNodes[previousNodeIndex] || {};

    if (node && prevNode && originalIndex !== moveToIndex) {
      const nodeRect = node.getBoundingClientRect();
      const prevNodeRect = prevNode.getBoundingClientRect();

      if (shiftForward) {
        animationShifts[previousNodeIndex] = [
          nodeRect.y === prevNodeRect.y ? nodeRect.left - prevNodeRect.left : 0,
          nodeRect.x === prevNodeRect.x ? nodeRect.top - prevNodeRect.top : 0,
        ];
      } else {
        animationShifts[previousNodeIndex] = [
          nodeRect.y === prevNodeRect.y
            ? nodeRect.right - prevNodeRect.right
            : 0,
          nodeRect.x === prevNodeRect.x
            ? nodeRect.bottom - prevNodeRect.bottom
            : 0,
        ];
      }

      times(maxIndex - minIndex + 1, i => {
        const index = i + minIndex;
        if (index !== originalIndex && index !== previousNodeIndex) {
          animationShifts[index] = animationShifts[previousNodeIndex];
        }
      });
    }

    return animationShifts;
  };

  getPlaceholderShift = (originalIndex, moveToIndex, shiftIndex) => {
    const shiftForward = shiftIndex > 0;
    const { node: target } = this.wrapperNodes[moveToIndex] || {};
    const { node: placeholder } = this.wrapperNodes[originalIndex] || {};
    let shiftX = 0;
    let shiftY = 0;

    if (target && placeholder) {
      const placeholderRect = placeholder.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      if (placeholderRect.y === targetRect.y) {
        shiftX = shiftForward
          ? targetRect.right - placeholderRect.right
          : targetRect.left - placeholderRect.left;
      }

      if (placeholderRect.x === targetRect.x) {
        shiftY = shiftForward
          ? targetRect.bottom - placeholderRect.bottom
          : targetRect.top - placeholderRect.top;
      }
    }

    return [shiftX, shiftY];
  };

  /**
   * Called when DragSource (list item) is hovered over DragTarget (other list item)
   * Calculates animation shifts & adds new element if it was dragged from another list
   *
   * @param {object} prop Prop
   * @param {number} prop.addedIndex Index to where dragged element should be added
   * @param {number} prop.removedIndex Index from where dragged element was removed
   * @param {number|string} prop.id item's `id`
   * @param {object} prop.item item from `items` prop that is being dragged
   * */
  handleHover = ({ addedIndex, item }) => {
    this.setState(prevState => {
      const originalIndex = this.state.items.indexOf(item);
      const items = [...prevState.items];
      let animationShifts = {};
      let { draggedId } = this.state;

      // New item added from other list
      if (originalIndex < 0) {
        items.splice(addedIndex, 0, item);
        draggedId = item.id;
      }
      // Existing item moved
      else {
        const moveToIndex = Math.min(items.length - 1, addedIndex);
        const shiftForward = moveToIndex > originalIndex;

        animationShifts = {
          ...this.getAnimationShifts(originalIndex, moveToIndex, shiftForward),
          [originalIndex]: this.getPlaceholderShift(
            originalIndex,
            moveToIndex,
            shiftForward,
          ),
        };
      }

      return { items, animationShifts, draggedId };
    });
  };

  handleDrop = ({
    payload,
    addedIndex,
    removedIndex,
    addedToContainerId,
    removedFromContainerId,
  }) => {
    this.props.onDrop({
      payload,
      addedIndex,
      removedIndex,
      addedToContainerId,
      removedFromContainerId,
    });
  };

  handleDragStart = data => {
    this.reSetAnimationState({ draggedId: data.id });
    if (this.props.onDragStart) {
      this.props.onDragStart(data);
    }
  };

  handleDragEnd = data => {
    this.reSetAnimationState();
    if (this.props.onDragEnd) {
      this.props.onDragEnd(data);
    }
  };

  renderPreview() {
    const { className, contentClassName, renderItem } = this.props;
    return (
      <div className={className}>
        <div className={contentClassName}>
          {this.state.items.map((item, index) => (
            <div key={`${item.id}-${index}-${this.props.containerId}`}>
              {renderItem({
                item,
                id: item.id,
                isPlaceholder: false,
                isPreview: false,
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderItem = args => {
    const dropped = this.context.dragDropManager.monitor.didDrop();
    const dragging = this.context.dragDropManager.monitor.isDragging();

    return this.props.renderItem({
      ...args,
      isListInDragState: dragging && !dropped,
    });
  };

  render() {
    const {
      className,
      contentClassName,
      groupName,
      dragPreview,
      containerId,
      withHandle,
      usePortal,
      animationDuration,
      animationTiming,
    } = this.props;
    const common = {
      groupName,
      containerId,
      onHover: this.handleHover,
      onMoveOut: this.handleMoveOut,
    };

    if (dragPreview) {
      return this.renderPreview();
    }

    return (
      <Container
        className={className}
        total={this.state.items.length}
        {...common}
      >
        <div className={contentClassName}>
          {this.state.items.map((item, index) => (
            <Draggable
              key={`${item.id}-${containerId}`}
              shift={this.state.animationShifts[index]}
              hasDragged={
                !!this.state.draggedId && this.state.draggedId !== item.id
              }
              setWrapperNode={this.setWrapperNode}
              animationDuration={animationDuration}
              animationTiming={animationTiming}
              {...common}
              id={item.id}
              index={index}
              item={item}
              renderItem={this.renderItem}
              withHandle={withHandle}
              usePortal={usePortal}
              onDrop={this.handleDrop}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              canDrag={this.props.canDrag}
              delay={this.props.delay}
              listOfPropsThatAffectItems={this.props.listOfPropsThatAffectItems}
            />
          ))}
        </div>
      </Container>
    );
  }
}

SortableList.displayName = 'SortableList';

SortableList.contextTypes = {
  dragDropManager: PropTypes.object,
};

SortableList.propTypes = {
  ...Draggable.propTypes,
  /** in case of wrong position of item during drag you can force SortableList to use portals */
  usePortal: PropTypes.bool,
  /**
   if you are having nested SortableLists,
   list that you are currently dragging need to be marked as dragPreview
   inside of renderItem callback
   */
  dragPreview: PropTypes.bool,
  /** list of items with {id: any} */
  items: PropTypes.array,
  /** callback for drag start */
  onDragStart: PropTypes.func,
  /** callback for drag end */
  onDragEnd: PropTypes.func,
  /** className of the root container */
  className: PropTypes.string,
  /** className of the first items parent container */
  contentClassName: PropTypes.string,
  /** animation duration in ms, default = 0 - disabled */
  animationDuration: PropTypes.number,
  /** animation timing function, default = '' (ease) */
  animationTiming: PropTypes.string,
  /** callback that could prevent item from dragging */
  canDrag: PropTypes.func,
  /** number in seconds to add delay between initial mouseDown and drag start  */
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

export default withDNDContext(SortableList);
