| Name  |  isRequired | description |
|----------|----------|--------------|
| Page.Header | true | The PageHeader object which defines the components within the Header |
| Page.Tail | false | A placeholder for a component which sticks to the bottom of the header. Page.Tail.children receive `minimized` flag |
| Page.Content | true | A placeholder for the page scrollable body, support `fullScreen` property which spans the content on the available area |
| Page.FixedContent (Deprecated) | false | A placeholder for a component which sticks to the bottom of the Tail (or bottom of Header if there is no Tail). It gets the same layout as the Page.Content. If Page.content `fullScreen` is enabled, then this FixedContent will be also full screen. |
| Page.Sticky | false | Sticky container (a `<div>` with css position: sticky). If child is a function, then a `{stickyStyle}` object is passed to this function, the `stickyStyle` should be applied to your container's `style` attribute. In this case `Page.Sticky` does NOT render any wrapping `<div>`. |
