# Styles

As `wix-style-react` provides the building block for creating draggable lists, it also provide the common useful styles.


## Importing
```js
import dndStyles from 'wix-style-react/dnd-styles';
```

`dndStyles` is an object containing the default class names.

Your component should use these styles and extend with any custom styles if needed.

## Styles API

`dndStyles` is consists of:

 - `list` - defines the structure of items list.
 - `item` - defines a single item resets. should be applied to the root of your item
 - `itemPlaceholder` - defines how an item's placeholder (the empty section after dragging) looks like. should be applied to the root of your item in placeholder mode
 - `itemPreview` - defines how an item should look while it is dragged. should be applied to the root of your item in preview mode
 - `isListInDragState` class - added to all items when any element is under dragging process and removed when process ended 
 And can fix acknowleged hover bug on items as:
  `&:hover:not(.isListInDragState) {
     ...
  }`
## Still missing (TODO)
- `handle`

## Examples