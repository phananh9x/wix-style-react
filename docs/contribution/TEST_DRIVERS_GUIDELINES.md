# Test Drivers Guidelines (For Public Drivers)

## Actions - What vs. How

Actions should accomodate for the user's intent (The "What") rather then  how the user interacts (click, focus, keydown,...).

### Example 1

An `<Search/>` input might have clear button (little `x`).

| Bad | Good |
|-----|------|
| `clickClearButton()` | `clear()` |

### Example 2 - Abstract complex actions

A `<Dropdown/>` allows selection from options.
The user needs to:
- click on the Input (to focus it)
- press key down (to open the options)
- click on an option

Instead of providing 3 methods:

```js
click()
keyDown()
clickOption(index)
```

You can provide one which will do it all:

```js
selectOption()
```

## Test the DOM

Every React prop set by the consumer has an affect on the DOM, or the behavior of the component (which affects the DOM).

Don't assert on React props or inner state.

## `data-hook`

Data hooks are HTMLElement data attributes added by the component . These hooks can be used by drivers to locate nested elements in the component.
For example:

```js
<div>
  <button data-hook="cancel">{props.cancelText}</button>
  <button data-hook="confirm">{props.confirmText}</button>
</div>
```

### Try To Keep `data-hook`'s Values Short

`data-hook`'s inflate the DOM, and are NOT removed in production.
This is to allow testing applications in production.
> The name `data-hook` is a Wix naming-convension.

But... avoid using `data-hook`'s if there is another "Natural" way to locate an element.
For example, if a component renders:

```js
<div>
  <button>Confirm</button>
</div>
```

In this simple case you can locate the button with a `tagName` selector.

## `exists()`

There is only one required method for each driver, the `exists()` method.

- A driver is created as a wrapper over an `element`.
- In case this `element` is `null` or `undefined`, the driver creation should NOT fail (throw error).
- The consumer creates drivers via "find-by-data-hook" helper.
- The consumer can use the `exists()` to check if the component was found or not.

## Render Slots

For render slots we should provide a getter that returns the consumer's element.

> Component.js

```js
const Comp = props => (
  <div>
    <div data-hook="left">{props.left}</div>
    <div data-hook="right">{props.right}</div>
  </div>
)
Comp.propTypes = {
  body: PropTypes.node
}
```

> Component.uni.driver.js

```js
export const ComponentDriver = base => (
  {
    getLeft: ()=> base.$(`[data-hook="left"]`).getNative();
    getRight: ()=> base.$(`[data-hook="right"]`).getNative();
  }
)
```

### Do NOT Expose Internal Elements

The only case where a Getter method would return an Element is to retrieve a **consumer's** element from a render slot. Apart from that, NEVER return an Element.
