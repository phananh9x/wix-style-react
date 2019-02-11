import ReactTestUtils from 'react-dom/test-utils';
import {
  getInstanceOfDraggableProvider,
  getInstanceOfDraggableSource,
  getInstanceOfDraggableTarget,
} from './driverHelpers';

import publicSortableListDriver from './SortableList.driver';

const sortableListFactory = ({ element, wrapper }) => {
  // in case if wrapper is coming from enzyme, we want to get it instance
  const vanillaWrapper = wrapper.instance ? wrapper.instance() : wrapper;
  const isCompositeComponent = ReactTestUtils.isCompositeComponent(
    vanillaWrapper,
  );

  if (!isCompositeComponent) {
    console.warn('SortableList factory expect to receive wrapper as composite component(react instance, and not a dom instance)'); // eslint-disable-line
  }
  const backend = isCompositeComponent
    ? getInstanceOfDraggableProvider(vanillaWrapper)
        .getManager()
        .getBackend()
    : null;
  return {
    ...publicSortableListDriver({ element, wrapper }),
    getDelayWrapper: () => element.querySelector('[data-hook="delay-wrapper"]'),
    beginDrag: itemId =>
      backend &&
      backend.simulateBeginDrag([
        getInstanceOfDraggableSource(vanillaWrapper, itemId).getHandlerId(),
      ]),
    endDrag: () => backend && backend.simulateEndDrag(),
    drop: () => backend && backend.simulateDrop(),
    hover: itemId =>
      backend &&
      backend.simulateHover([
        getInstanceOfDraggableTarget(vanillaWrapper, itemId).getHandlerId(),
      ]),
  };
};

export default sortableListFactory;
