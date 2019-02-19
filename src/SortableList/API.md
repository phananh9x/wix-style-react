```js
  ...
  import dndStyles from 'wix-style-react/dnd-styles';
  ...

  <SortableList
    containerId="my-unique-id"
    groupName="columns-between-which-i-can-drag"
    items={[{id: 1, text: 'item1'}, {id: 2, text: 'item2'}]}
    className={dndStyles.list}
    contentClassName="my-class-for-sortable-list-content"
    renderItem={({isPlaceholder, isPreview, id, previewStyles, item}) => (
      const classes = classNames(
        dndStyles.item,
        {
          [dndStyles.itemPlaceholder]: isPlaceholder,
          [dndStyles.itemPreview]: isPreview
        }
      );
      return (
        <div className={classes} style={previewStyles}>
          {item.text}
        </div>
      )
    )}
    withHandle={false}
    usePortal={false}
    dragPreview={false}
    onDrop={({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload}) => console.log({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload})}
  />
```

<details>
  <summary>`Props`</summary>
  | propName         | propType | defaultValue | isRequired | description |
  | ---              | ---      | ---          | ---        | ---         |
  | items            | array    | -            | true       | array of items, each item should have an id. |
  | renderItem       | func     | -            | true       | render function which will be used to render item block inside of sortable list |
  | onDrop           | func     | -            | true       | callback for onDrop event, it will be called after user drop smth |
  | containerId      | string   | -            | true       | unique id, it required to prevent or allow d&d between several containers |
  | className        | string   | -            | -          | className for root of  SortableList, in case if you want to style root element of SortableList |
  | contentClassName | string   | -            | -          | className for items wrapper div, it maybe useful if you want to make horizontal sortable list |
  | groupName        | string   | -            | -          | name of group to which SortableList is related, d&d allowed inside of the same group |
  | withHandle       | bool     | false        | -          | should whole item be draggable or just handle on it|
  | usePortal        | bool     | false        | -          | render item preview into body|
  | dragPreview      | bool     | false        | -          | in case if you have nested SortableLists, you need to set dragPreview to true when you drag nested SortableList |
  | animationDuration| number   | 0            | -          | animation duration. Please note, `SortableList` uses CSS `transition`s to animate itself
  | animationTiming  | string   | ''           | -          | animation timing function
  | delay            | number   |  -           | -          | number of ms that user should press on item before drag will start
  | canDrag          | func     |  -           | -          | function which will be used before drag start and can prevent it like if returns false: () => false |
  | listOfPropsThatAffectItems | array     |  -           | -          | Array that contains values that are used inside of renderItem callback.(Change of these values cause re-call of renderItem func) |
</details>

Some details about complex props


<details>
  <summary>`items`</summary>
  Example:
  ```js
  [
    {
      id: 'a',
      text: 'Item 1'
    },
    {
      id: 'b',
      text: 'Item 2'
    },
    {
      id: 'c',
      text: 'Item 3'
    },
    {
      id: 'd',
      text: 'Item 4'
    }
  ]
  ```
</details>
<details>
  <summary>`renderItem`</summary>
  This function called with such parameters:

  - `isPlaceholder` - if item in drag state,
  then instead of an item(item previous place)
  we want to render placeholder(empty block, or left item as it is), so you able to style your item by cheking isPlaceholder.
  - `isPreview` - if item in drag(fly) state,
  then instead of an item,
  we want to render preview
  state(maybe we want to rotate it a little, or hide something),
  so you able to style your item by cheking isPreview.
  - `id` - an id from item that you render
  - `previewStyles` - styles that coming from SortableList, `you always need to apply` them on your root div, inside of renderItem
  You can add item width as `style={{...previewStyles, width: your_width }}`. By default previewStyles contain original items `width` in pixels
  - `item` - item that you are render

  Example without handle:
  ```js
  renderItem = ({isPlaceholder, isPreview, id, previewStyles, item, delayed}) => {
      const classes = classNames(
        styles.card,
        {
          [styles.placeholder]: isPlaceholder,
          [styles.preview]: isPreview,
          [styles.delayed]: delayed
        });

      return (
        <div className={classes} style={previewStyles} data-hook={`item-${id}`}>
          {item.text}
        </div>
      );
    }
  ```

  Example with handle:
  ```js
  renderItem = ({isPlaceholder, isPreview, id, connectHandle, previewStyles, item}) => {
      const classes = classNames(
        styles.card,
        {
          [styles.placeholder]: isPlaceholder,
          [styles.preview]: isPreview
        });

      return (
        <div className={classes} style={previewStyles} data-hook={`item-${id}`}>
          {connectHandle(
            <div className={styles.handle} data-hook={`card-${id}-handle`}>
              <DragAndDropLarge/> // an icon
            </div>
          )}
          {item.text}
        </div>
      );
    }
  ```
</details>
<details>
  <summary>`onDrop`</summary>
  This function called with such parameters:

  - `removedIndex` - index of an item previous position inside of original items array
  - `addedIndex` - index of an item new position inside of new items array
  - `removedFromContainerId` - id of the container(SortableList instance) from which item was removed
  - `addedToContainerId` - id of the container(SortableList instance) to which item was dropped
  - `payload` - original item data

  Example of d&d onDrop callback for drag between two columns(two SortableList)

  ```js
  handleDrop = ({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload}) => {
    const nextState = copy(this.state);
    nextState[removedFromContainerId].splice(removedIndex, 1);
    nextState[addedToContainerId].splice(addedIndex, 0, payload);

    this.setState({...nextState});
  };
  ```
</details>
<details>
  <summary>`dragPreview`</summary>
  Case of nested sortable list

  ```js
    ...
    renderColumn = ({isPlaceholder, isPreview, item, id, previewStyles}) => {
      const classes = classNames(
        {
          [classNames(defaultDndStyles.itemPlaceholder, styles.columnPlaceholder)]: isPlaceholder,
          [classNames(defaultDndStyles.itemPreview, styles.columnItemPreview)]: isPreview
        },
        classNames(defaultDndStyles.item, styles.columnItem)
      );

      return (
        <div className={classes} style={previewStyles} data-hook={`column-${id}`}>
          <SortableList
            dragPreview={isPreview}
            className={classNames(defaultDndStyles.list, styles.column)}
            dataHook={`column-${id}`}
            groupName="multi-area"
            containerId={id}
            items={item.items}
            renderItem={this.renderCell}
            onDrop={this.handleDropCell}
            />
        </div>
      );
    }

    render() {
      return (
        <DragDropContextProvider>
          <div className={styles.root}>
            <SortableList
              className={classNames(defaultDndStyles.list, styles.table)}
              contentClassName={styles.content}
              dataHook="draggable-column-multi-area"
              containerId="multiArea"
              items={this.state.columns}
              renderItem={this.renderColumn}
              onDrop={this.handleDropColumn}
              />
          </div>
        </DragDropContextProvider>
      );
    }
  ```
</details>
<details>
  <summary>`onDrop`</summary>
  This function called with such parameters:

  - `removedIndex` - index of an item previous position inside of original items array
  - `addedIndex` - index of an item new position inside of new items array
  - `removedFromContainerId` - id of the container(SortableList instance) from which item was removed
  - `addedToContainerId` - id of the container(SortableList instance) to which item was dropped
  - `payload` - original item data

  Example of d&d onDrop callback for drag between two columns(two SortableList)

  ```js
  handleDrop = ({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload}) => {
    const nextState = copy(this.state);
    nextState[removedFromContainerId].splice(removedIndex, 1);
    nextState[addedToContainerId].splice(addedIndex, 0, payload);

    this.setState({...nextState});
  };
  ```
</details>
<details>
  <summary>`listOfPropsThatAffectItems`</summary>
  You can also check SortableList.spec.js(`should call renderItem when props changed`) test.

  ```js
    ...
    class MyComponent extends React.Component {
      state = {
        isListInDragState: false
      }
      handleDragStart = () => this.setState({ isListInDragState: true })
      handleDragEnd = () => this.setState({ isListInDragState: false })

      /* 
        GOAL:
        inside of render item callback we use `isListInDragState` from state,
        so we expect, that when we will do setState({ isListInDragState: someValue }),
        the renderItem will call again and render updated state in dom
      */
      renderItem = ({ item }) => (
        <div key={item.id} data-hook={`item-${item.id}`}>
          {item.text}
          Is list in drag state? - {this.state.isListInDragState ? 'yes' : 'no'}
        </div>
      )

      render() {
        /* 
          To achieve our goal from renderItem callback, we need to tell SortableList,
          that this.state.isListInDragState can affect our items view and that SortableList need to
          call renderItem again when this.state.isListInDragState changed.
          To do this we use `listOfPropsThatAffectItems`
        */
        return (
          <div>
            <SortableList
              contentClassName="cl"
              dataHook={dataHook}
              containerId="sortable-list-1"
              groupName="group1"
              items={items}
              renderItem={this.renderItem}
              onDrop={onDrop}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              listOfPropsThatAffectItems={[this.state.isListInDragState]}
            />
          </div>
        );
      }
    }
  ```
</details>

