# DragDropContextProvider
With `<DragDropContextProvider/>` component you are able to define which parts of your application will support D&D. It provides all required context for your D&D component to work.

## Basic usage
In most cases, if you're just using a simple `wix-style-react` component that has D&D functionality, you will probably not need to use the provider at all.
By default, all `wix-style-react`'s D&D components uses `<DragDropContextProvider/>` internally.

## When should I use it?

### Sharing context
You should use it in cases when sharing the same D&D context is required. For example - Multiple sortable columns with D&D between them.
For such use case, we wrap both components with the same `DragDropContextProvider` and provide shared D&D context.

```jsx
import DragDropContextProvider from 'wix-style-react/DragDropContextProvider`

<DragDropContextProvider>
  <Column1/>
  <Column2/>
</DragDropContextProvider>
```

Now, both `<Column1/>` and `<Column2/>` shares the same context and support D&D between them.

### Testing
TODO - explain how to use it in tests

### TODO - add props table (should sit next to the component)
