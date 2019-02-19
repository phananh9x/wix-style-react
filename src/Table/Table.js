import React from 'react';
import PropTypes from 'prop-types';
import defaultTo from 'lodash/defaultTo';
import classNames from 'classnames';

import style from './Table.st.css';
import DataTable from '../DataTable';
import Checkbox from '../Checkbox';
import { TableContext } from './TableContext';
import { BulkSelection, BulkSelectionState } from './BulkSelection';
import Tooltip from '../Tooltip/Tooltip';
import {
  TableToolbarContainer,
  TableTitleBar,
  TableContent,
  TableEmptyState,
} from './components';

export function createColumns({ tableProps, bulkSelectionContext }) {
  const createCheckboxColumn = ({
    toggleAll,
    bulkSelectionState,
    toggleSelectionById,
    isSelected,
    disabled,
  }) => {
    return {
      title: (
        <Checkbox
          dataHook="table-select"
          checked={bulkSelectionState === BulkSelectionState.ALL}
          indeterminate={bulkSelectionState === BulkSelectionState.SOME}
          disabled={disabled}
          onChange={() => toggleAll()}
        />
      ),
      render: (row, rowNum) => {
        const id = defaultTo(row.id, rowNum);
        return (
          <div onClick={e => e.stopPropagation()}>
            <Checkbox
              disabled={disabled}
              dataHook="row-select"
              checked={isSelected(id)}
              onChange={() => toggleSelectionById(id)}
            />
          </div>
        );
      },
      width: '12px',
    };
  };

  return tableProps.showSelection
    ? [createCheckboxColumn(bulkSelectionContext), ...tableProps.columns]
    : tableProps.columns;
}

export function getDataTableProps(tableProps) {
  /* eslint-disable no-unused-vars */
  const {
    showSelection,
    selectedIds,
    onSelectionChanged,
    dataHook,
    hideHeader,
    ...props
  } = tableProps;
  return {
    ...props,
    rowClass: classNames(tableProps.rowClass, style.tableRow),
  };
}

/**
 * Table is a composit component that allows adding SelectionColumn, Toolbar (on top of the TitleBar).
 * It is a context provider, and thus the Table.Consumer, Table.TitleBar and Table.Content can be rendered separatly.
 */
export class Table extends React.Component {
  static ToolbarContainer = TableToolbarContainer;
  static Titlebar = TableTitleBar;
  static Content = TableContent;
  static EmptyState = TableEmptyState;

  shouldComponentUpdate() {
    // Table is not really a PureComponent
    return true;
  }

  setSelectedIds(selectedIds) {
    this.bulkSelection.setSelectedIds(selectedIds);
  }

  renderChildren() {
    const children = this.props.children;
    return this.props.withWrapper ? (
      <div
        data-hook={this.props.dataHook}
        {...style(
          'root',
          { isRowClickable: !!this.props.onRowClick },
          this.props,
        )}
      >
        {children}
      </div>
    ) : (
      children
    );
  }

  render() {
    return (
      <TableContext.Provider value={this.props}>
        {this.props.showSelection ? (
          <BulkSelection
            ref={_ref => (this.bulkSelection = _ref)}
            selectedIds={this.props.selectedIds}
            disabled={this.props.selectionDisabled}
            allIds={this.props.data.map((rowData, rowIndex) =>
              defaultTo(rowData.id, rowIndex),
            )}
            onSelectionChanged={this.props.onSelectionChanged}
          >
            {this.renderChildren()}
          </BulkSelection>
        ) : (
          this.renderChildren()
        )}
      </TableContext.Provider>
    );
  }
}

Table.displayName = 'Table';

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  children: [<Table.Content key="content" />],
  withWrapper: true,
  showLastRowDivider: false,
};

Table.propTypes = {
  children: PropTypes.any,
  dataHook: PropTypes.string,

  //DataTable Props
  /** Allows to open multiple row details */
  allowMultiDetailsExpansion: PropTypes.bool,
  /** The data to display. (If data.id exists then it will be used as the React key value for each row, otherwise, the rowIndex will be used) */
  data: PropTypes.array, // Not performing any shape validation to not hurt performance.
  /** Configuration of the table's columns. See table below */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
      render: PropTypes.func.isRequired,
      sortable: PropTypes.bool,
      infoTooltipProps: PropTypes.shape(Tooltip.propTypes),
      sortDescending: PropTypes.bool,
      align: PropTypes.oneOf(['start', 'center', 'end']),
    }),
  ).isRequired,
  /** A func that gets row data and returns a class(es) to apply to that specific row */
  dynamicRowClass: PropTypes.func,
  /** Whether there are more items to be loaded. Event listeners are removed if false. */
  hasMore: PropTypes.bool,
  /** Should we hide the header of the table. */
  hideHeader: PropTypes.bool,
  /** An id to pass to the table */
  id: PropTypes.string,
  /** If true, table will not render all data to begin with, but will gradually render the data as the user scrolls */
  infiniteScroll: PropTypes.bool,
  /** If infiniteScroll is on, this prop will determine how many rows will be rendered on each load */
  itemsPerPage: PropTypes.number,
  /** The loader to show when loading more items. */
  loader: PropTypes.node,
  /** A callback when more items are requested by the user. */
  loadMore: PropTypes.func,
  /** A callback method to be called on row click. Signature: `onRowClick(rowData, rowNum)` */
  onRowClick: PropTypes.func,
  /** A callback method to be called on row mouse enter. Signature: `onMouseEnterRow(rowData, rowNum)` */
  onMouseEnterRow: PropTypes.func,
  /** A callback method to be called on row mouse leave. Signature: `onMouseLeaveRow(rowData, rowNum)` */
  onMouseLeaveRow: PropTypes.func,

  /** Add scroll listeners to the window, or else, the component's parentNode. */
  useWindow: PropTypes.bool,
  /** Add scroll listeners to specified DOM Object. */
  scrollElement: PropTypes.object,
  /** Table cell vertical padding. should be 'medium' or 'large'  */
  rowVerticalPadding: PropTypes.oneOf(['medium', 'large']),
  /** Function that returns React component that will be rendered in row details section. Example: `rowDetails={(row, rowNum) => <MyRowDetailsComponent {...row} />}` */
  rowDetails: PropTypes.func,
  /** A string data-hook to apply to all table body rows. or a func which calculates the data-hook for each row  - Signature: `(rowData, rowNum) => string` */
  rowDataHook: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A class to apply to all table body rows */
  rowClass: PropTypes.string,

  /** Should the table show the header when data is empty */
  showHeaderWhenEmpty: PropTypes.bool,

  // Table props

  /** Called when row selection changes.
   * Receives 2 arguments: `selectedIds` array, and a `change` object ( in this order).
   * `selectedIds` is the updated selected ids.
   * `change` object has a `type` property with the following possible values: 'ALL', 'NONE', 'SINGLE_TOGGLE'.
   * In case of 'SINGLE_TOGGLE' the `change` object will also include an `id` prop with the item's id,
   * and a `value` prop with the new boolean selection state of the item. */
  onSelectionChanged: PropTypes.func,
  /** Indicates wether to show a selection column (with checkboxes) */
  showSelection: PropTypes.bool,
  /** Array of selected row ids.
   *  Idealy, id should be a property on the data row object.
   *  If data objects do not have id property, then the data row's index would be used as an id. */
  selectedIds: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  /** Is selection disabled for the table */
  selectionDisabled: PropTypes.bool,
  /** The width of the fixed table. Can be in percentages or pixels. */
  width: PropTypes.string,
  /**
   *  When false then Table would not create a `<div/>` wrapper around it's children.
   *  Useful when using `<Table/>` to wrap a `<Page/>` component, in that case we use the `<Table/>` only as a context provider and it doesn't render anything to the DOM by itself.*/
  withWrapper: PropTypes.bool,
};

// export default Table;
