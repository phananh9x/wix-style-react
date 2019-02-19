import React from 'react';
import {
  string,
  number,
  arrayOf,
  oneOfType,
  func,
  any,
  bool,
} from 'prop-types';
import createReactContext from 'create-react-context';

export const BulkSelectionContext = createReactContext();

export const BulkSelectionState = Object.freeze({
  ALL: 'ALL',
  NONE: 'NONE',
  SOME: 'SOME',
});

export const ChangeType = Object.freeze({
  ALL: 'ALL',
  NONE: 'NONE',
  SINGLE_TOGGLE: 'SINGLE_TOGGLE',
});

/** Helper for PropTypes for componenst which consume the BulkSelection context */
export const BulkSelectionContextPropTypes = {
  isSelected: func,
  selectedCount: number,
  getSelectedIds: func,
  bulkSelectionState: string,
  toggleSelectionById: func,
  toggleAll: func,
  selectAll: func,
  deselectAll: func,
  setSelectedIds: func,
};

/**
 * BulkSelection manages the state and logic of bulk selection.
 * Given an array of selectable items, it manages a bulk selection state (ALL, SOME, NONE),
 * and provides helper methods for modifying the state.
 *
 * toggleBulkSelection(): changes the bulk state according to these state changes: ALL->NONE, SOME->ALL, NONE->ALL
 */
export class BulkSelection extends React.Component {
  constructor(props) {
    super(props);
    const selectedIds = (props.selectedIds || []).slice();
    this.state = {
      selectedIds, // not exposed to context consumers
      helpers: this.createHelpers({ ...props, selectedIds }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedIds &&
      !this.areSelectedIdsEqual(nextProps.selectedIds, this.state.selectedIds)
    ) {
      this.setSelectedIds(nextProps.selectedIds.slice(), undefined, nextProps);
    }
  }

  toggleAll = enable => {
    if (enable) {
      this.setSelectedIds(this.props.allIds, { type: ChangeType.ALL });
    } else {
      this.setSelectedIds([], { type: ChangeType.NONE });
    }
  };

  toggleBulkSelection = () => {
    const bulkSelectionState = this.state.helpers.bulkSelectionState;
    if (bulkSelectionState === BulkSelectionState.SOME) {
      this.toggleAll(true);
    } else if (bulkSelectionState === BulkSelectionState.ALL) {
      this.toggleAll(false);
    } else {
      this.toggleAll(true);
    }
  };

  toggleSelectionById = id => {
    const newSelectionValue = !this.state.helpers.isSelected(id);
    this.setSelectedIds(
      newSelectionValue
        ? this.state.selectedIds.concat(id)
        : this.state.selectedIds.filter(_id => _id !== id),
      {
        type: ChangeType.SINGLE_TOGGLE,
        id,
        value: newSelectionValue,
      },
    );
  };

  setSelectedIds = (selectedIds, change, props) => {
    if (!Array.isArray(selectedIds)) {
      throw new Error('selectedIds must be an array');
    }
    if (!props) {
      props = this.props;
    }
    this.setState(
      { selectedIds, helpers: this.createHelpers({ ...props, selectedIds }) },
      () => {
        this.props.onSelectionChanged &&
          this.props.onSelectionChanged(selectedIds.slice(), change);
      },
    );
  };

  areSelectedIdsEqual = (selectedIds1, selectedIds2) => {
    if (
      (selectedIds1 === undefined && selectedIds2 === undefined) ||
      (selectedIds1 === null && selectedIds2 === null)
    ) {
      return true;
    }

    return (
      Array.isArray(selectedIds1) &&
      Array.isArray(selectedIds2) &&
      selectedIds1.length === selectedIds2.length &&
      selectedIds1.every((item, index) => item === selectedIds2[index])
    );
  };
  createHelpers(props) {
    const { selectedIds, allIds } = props;
    const totalCount = allIds.length;
    const selectedCount = selectedIds.length;
    const bulkSelectionState =
      selectedCount === 0
        ? BulkSelectionState.NONE
        : selectedCount === totalCount
        ? BulkSelectionState.ALL
        : BulkSelectionState.SOME;

    return {
      // Getters
      /** Is the item with the given id selected. (id comes from the rowData.id if exists, if not then it is the rowIndex) */
      isSelected: id => selectedIds.indexOf(id) !== -1,
      /** Number of selected items */
      selectedCount,
      /** Get a copy (array) of selected ids */
      getSelectedIds: () => selectedIds.slice(),
      /** A string representing the BulkSelection state (not a React state).
       * Possible values: ALL, SOME, NONE
       */
      bulkSelectionState,
      disabled: this.props.disabled,
      // Modifiers
      /** Toggle the selection state (selected/not-selected) of an item by id */
      toggleSelectionById: this.toggleSelectionById,
      /** Toggles the bulk selection state: NONE -> ALL, SOME -> ALL, ALL -> NONE */
      toggleAll: this.toggleBulkSelection,
      /** Select all items */
      selectAll: () => this.toggleAll(true),
      /** Deselect all items (clear selection) */
      deselectAll: () => this.toggleAll(false),
      /** Set the selection.
       * An optional `change` argument will be passed "as is" to the Table's onSelectionChanged callback.
       */
      setSelectedIds: this.setSelectedIds,
    };
  }

  render() {
    return (
      <BulkSelectionContext.Provider value={this.state.helpers}>
        {this.props.children}
      </BulkSelectionContext.Provider>
    );
  }
}

BulkSelection.propTypes = {
  /** Array of item selection boolean states. Should correspond in length to the data prop */
  selectedIds: oneOfType([arrayOf(string), arrayOf(number)]),
  /** An array of all item ids (string ids) */
  allIds: oneOfType([arrayOf(string), arrayOf(number)]).isRequired,
  /** Called when item selection changes.
   * Receives 2 arguments, the updated selectedIds array, and a `change` object.
   * `change` object has a `type` property with the following possible values: 'ALL', 'NONE', 'SINGLE_TOGGLE'.
   * In case of 'SINGLE_TOGGLE' the `change` object will also include an `id` prop with the item's id,
   * and a `value` prop with the new boolean selection state of the item. */
  onSelectionChanged: func,
  /** Are checkboxes disabled */
  disabled: bool,
  /** Any - can consume the BulkSelectionProvider context */
  children: any,
};
