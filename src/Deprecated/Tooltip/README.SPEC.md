vim:nowrap:

# The new `<Tooltip/>`

### Issues with the current Tooltip

  * Uses our own naive postioning mechanism, [which](https://github.com/wix/wix-style-react/issues/2754) [has](https://github.com/wix/wix-style-react/issues/2596) [several](https://github.com/wix/wix-style-react/issues/2582) [issues](https://github.com/wix/wix-style-react/issues/2069). The mechanism is not at mature and community backed as [`Popper.js`](https://github.com/FezVrasta/popper.js).
  * Can be both Controlled and Uncontrolled, leads to confusion.
  * Does not follow the UX guidelines:
    * A tooltip should only be opened on HOVER, currently the consumers can set the triggering
        events.
    * A tooltip should only contains textual content, currently it can accept any node.
    * Our `<Tooltip/>` could be used as Popover (opens on click), leads to confusion.
    * The Tooltip should has a `dark` theme, currently it's defaulted to a `light` theme.

### The solution

  > Update the `<Tooltip/>` component according to the UX guidelines and improve its positioning
  > mechanism.

This "mechanism" is ready, and it's called `<Popover/>`. This is a controlled component that uses
the `Popper.js` library to handle positioning.

#### What's next about `<Tooltip/>`?

The plan is to create a **new** `<Tooltip/>`. As discussed, it should:

  * Use the `<Popper/>` component for positioning;
  * Be **Uncontrolld**,  and **only open on HOVER**, as per the UX guidelines;
  * Has a `dark` theme by default (and the theme cannot be changed);
  * Has a slimmer API;
  * Uses UniDriver.

We'll use the `upgrade` prop method like @mykas did for the new `<Button/>`. We'll deprecate the
"old" `<Tooltip/>` and remove it completly in the next major Version (V7? 🙏).

#### Basic usage

```jsx
import React from 'react';
import Tooltip from 'wix-style-react/Tooltip';

const MyComponent = () => (
  <div>
    <Tooltip
      upgrade
      animate
      placement="top"
      content="This is a very long text that is not actually ellipsed but you get the point"
    >
      This is a very long text that is no...
    </Tooltip>
  </div>
);

export default MyComponent;
```

#### Props

| Name          | Type                        | Default value | Required | Description                                                                                                                                               |
|---------------|-----------------------------|---------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `content`     | `string`, `ReactNode`       |               |          | The content to be inside the `<Tooltip/>`. If `ReactNode`, should be a textual component (such as `<Text/>` and `<TextButton/>` as per the UX guidelines. |
| `appendTo`    | `Popover.AppendTo`          | `parent`      |          | Delegated to `<Popover/>`.                                                                                                                                |
| `children`    | `ReactNode`, `string`       |               |          | The target element.                                                                                                                                       |
| `dataHook`    | `string`                    |               |          |                                                                                                                                                           |
| `hideDelay`   | `Number`                    |               |          |                                                                                                                                                           |
| `showDelay`   | `Number`                    |               |          |                                                                                                                                                           |
| `moveArrowTo` | `Number`                    |               |          | _This may not be needed, need discussion_                                                                                                                 |
| `moveTo`      | `{ x: Number, y: Number }`  |               |          |                                                                                                                                                           |
| `onHide`      | `Function`                  |               |          | Callback function to be called when hidden                                                                                                                |
| `onShow`      | `Function`                  |               |          | Callback function to be called when shown                                                                                                                 |
| `placement`   | `Popover.Placement`         | `'top'`       |          |                                                                                                                                                           |
| `animate`     | `Boolean`                   | `true`        |          |                                                                                                                                                           |
| `maxWidth`    | `Number`                    | `204`         |          |                                                                                                                                                           |
| `textAlign`   | `oneOf ['center', 'start']` | `start`       |          |                                                                                                                                                           |
| `showArrow`   | `Boolean`                   |               |          |                                                                                                                                                           |
| `flip`        | `Boolean`                   | `true`        |          |                                                                                                                                                           |
| `fixed`       | `Boolean`                   | `false`       |          |                                                                                                                                                           |
