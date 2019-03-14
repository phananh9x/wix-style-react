# Styles
`<SortableList/>` provides mainly the sorting drag and drop behavior, but it also has mandatory styles which are required to be applied in order to set to set the correct positioning for item that you drag.
Also, as `<SortableList/>` can not fit all possible styles, it give you the freedom to apply your styles to make it look as you wish.

  To see how styles are used and extended please refer to the **Single Item** code example.

## Default styles
The default styles should be consumed from the common `dnd-styles` entry and sent in the following:
* `className` - will be applied to the root div of the component.
* `contentClassName` - will be applied to the first parent of list items. This is helpful when you need some padding between items.
* Inside the `renderItem` returned element

## Mandatory (inline) styles
You, the consumer, must apply some styles in certain cases to make sure drag and drop behavior works well.
There styles will be passed to the `renderItem` callback function you provide to the component in the named parameter `previewStyles` as one of it's parameters.

We do not recommend to modify this object or to merge it with another inline styles, prefer css classes for other modifications.

### Usage example:
```js
renderItem={({previewStyles}) => (
  <div style={previewStyles}>
    your item
  </div>
)}
```

## Conditional styles
As the `renderItem` callback function returns is a renderer to all items scenarios, it is also responsible to render the preview and placeholder of the item.
The provided parameters `isPlaceholder`, `isPreview` will help you understand which style is required.

## Customized styles
we suggest using the [`classnames`](https://github.com/JedWatson/classnames) package to combine both mandatory and additional styles

### Example
```js
...
import dndStyles from 'wix-style-react/dnd-styles';
import styles from './custom-styles.scss'
import classNames from 'classnames';
...
export default () =>
  <SortableList
    className={classNames(dndStyles.list, styles.list)}
    contentClassName={styles.content}
    renderItem={({isPlaceholder, isPreview, previewStyles}) => (
      const classes = classNames(
        dndStyles.item,
        styles.item,
        {
          [classNames(dndStyles.itemPlaceholder, styles.itemPlaceholder)]: isPlaceholder,
          [classNames(dndStyles.itemPreview, styles.itemPreview)]: isPreview
        }
      );
      return (
        <div className={classes} style={previewStyles}>
          your item
        </div>
      )
    )}
    {...otherProps}
  />
```