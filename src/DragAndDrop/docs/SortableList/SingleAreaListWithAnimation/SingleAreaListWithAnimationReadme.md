# Single Area Drag and Drop list with animations

An example how to use the `<SortableList/>` component to create reorderable list of items with reorder animation.

The items can be dragged completely or using only a handler, give the configuration.

In this example we just provide 2 extra props for `SortableList`

```js
animationDuration={500} // set animation duration
animationTiming="cubic-bezier(0.19, 1, 0.22, 1)" // set animation timing
```