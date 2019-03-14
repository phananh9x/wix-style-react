# `<Table/>`

> A Table component for displaying data, with selection-column, tool-bar.
> Future Development will include: actions-column, row-builder.

## Table props
> See API tab

### `columns` prop object

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string or node | - | true | A string or any element, the column's header title  |
| render | function | - | true | A function to render column cells. The function will be called with each row's data and should return a jsx element. Signature: `render(rowData, rowNum)` |
| width | string | - | - | The width to apply to the column. No value means column will try to contain its children, if possible.  |
| important | bool | false | - | Whether font color should be stronger, more dominant |
| sortable | bool | false | - | Enables sorting by column |
| sortDescending | bool | - | - | Pass false - for ascending sort, true - for descending|
| infoTooltipProps | object | - | - | Props object for [tooltip](https://wix-wix-style-react.surge.sh/?selectedKind=7.%20Tooltips&selectedStory=7.1.%20Tooltip&full=0&addons=0&stories=1&panelRight=0). Note: dataHook, moveBy and children will not be passed to tooltip. |
| align | oneOf(`start`, `center`, `end`) | - | - | The alignment of the column |

## Children

### `<Table.ToolbarContainer/>`

The `<ToolbarContainer/>` is a consumer of the Table's SelectionContext (React 16 context API). Which means it expects to receive a single child as a function. That function receives the following SelectionContext object as an argument.

The recomended behavior is for the Table to display a Main-Toolbar when there is no selected rows, and a BulkActionsToolbar when any rows are selected.


```js
<Table.ToolbarContainer>
  {
    selectionContext =>
      selectionContext.selectedCount === 0 ?
        renderMainToolbar() :
        renderBulkActionToolbar()

  }
<Table.ToolbarContainer>
```

#### SelectionContext

`SelectionContext` is an object with the following properties and methods:

##### Properties
| name | type | description |
|----------|----------|--------------|
| selectedCount | number | Number of selected items | 
| bulkSelectionState | string | A string representing the BulkSelection state (not a React state). Possible values: ALL, SOME, NONE |

##### Methods
| name | arguments | return | description |
|----------|----------|--------------|--------------|
| isSelected | id: string &#124; number | boolean | Is the item with the given id selected. (id comes from the rowData.id if exists, if not then it is the rowIndex)  |
|getSelectedIds| - | Array<string> &#124; Array<number> |Get a copy (array) of selected ids|
|toggleSelectionById| id: string &#124; number | void |Toggle the selection state (selected/not-selected) of an item by id |
|toggleAll| - | void | Toggles the bulk selection state: NONE -> ALL, SOME -> ALL, ALL -> NONE  |
|selectAll| - | void | Select all items |
|deselectAll| - | void | Deselect all items (clear selection) |
|setSelectedIds|(selectedIds: Array<string> &#124; Array<number>, change?: {type: string, id?: string &#124; number, value?: boolean }) | void | Set the selection. An optional `change` argument will be passed "as is" to the Table's onSelectionChanged callback. |

### `<Table.Content/>`
You can render `<Table.Content/>` anywhere inside a `<Table/>` (not necessarily as a direct child).

#### Props

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| titleBarVisible | boolean | true | false | whether to display the column's title bar (`<thead>`) or not. (defaults to  `true`) |

### `<Table.TitleBar/>`

The `<Table/>` title bar (or "header"). Can be useful when setting `titleBarVisible` to `true`, so
you can render the title bar independently. See the "Table in a Page" example for example usage.

### `<Table.EmptyState/>`

An `<EmptyState>` for usage within a table. See the "Table in a Page" example for example usage.

#### Props

Accepts the same props as `<EmptyState/>`. See the API tab in the `<EmptyState/>` story for a full
list of valid props.

## Playground
