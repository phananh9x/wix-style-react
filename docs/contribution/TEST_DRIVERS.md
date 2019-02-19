# Test drivers

Test driver is a simple abstraction on top of component and supply a good way for the consumers to interact with the component.

## Types of drivers

### unidriver (for every new component)

All component drivers in this library should be built on top of [unidriver](https://github.com/wix-incubator/unidriver). `unidriver` is a tool to write universal component drivers that can be reused in all test levels, from component to e2e.

### legacy drivers (for existing components)

The library still contain a lot of technology specific drivers, mainly for the following ones:

- `enzyme` and `vanilla` for regular dom interaction.
- `protractor` for browser interaction.
- `puppeteer` for browser interaction.

We will slowly migrate to use only unidriver, but in the meanwhile both still exist.

### Composing unidriver with legacy drivers

If your component's `unidriver` is composing other components that don’t use unidriver, please make sure to create a new `ConsumedComponent.uni.driver.js` next to the consumed component. You can start by implementing only the required functions and not the entire driver.

## Public and Private drivers

1. The **Public** drivers (`component.driver.js`) are the ones that exposed to the consumers of the components. They should be simple abstractions over common actions (for example, selecting the third element in the dropdown).
2. The **Private** drivers (`component.driver.private.js`) are used for actions on a component that should not be exposed to the user. For example, asserting a class name existance on some component.
3. The Private drivers are extending the public ones and should be used internally when testing the components.

## Best Practices (For Public Drivers)

1. Drivers should be used for when testing and do one of the following:

    - Make a side effect (e.g. click)
    - Retrieve some primitive value as string, number or boolean (e.g. some value / is checked)
1. Drivers should help testing the behavior and the DOM and not test React, so never check for component props.
1. Components use `data-hook`s to easily locate parts of the DOM. We use them in the driver to query the elements.
1. Drivers are tested internally in the library and exposed to consumers as TestKits.
1. Drivers should have the `exists()` method to verify component is rendered properly.
1. Never return a `DOM` element as this is not a good abstraction over the component.
1. For render slots (props that accept ReactElement), we don't provide a driver getter. The consumer can query for it himself (By `data-hook` or other selector)

## Exposed TestKits

1. Each component has a `<componentName>TestkitFactory` method which exposes the test driver of the relevant to component.
1. A TestKit input is a wrapper object (DOM node for vanilla, enzyme wrapper for enzyme) and `dataHook`, and returns an object which contains all API methods.
1. The created Testkit has an `exists` method. All other methods should throw an error with propper message when `testkit.exists() === false`.

### Consumer Usage example

Using wix style Button in your production code:

```js
<MyForm>
  ...
  <Button dataHook="my-button" />
  ...
</MyForm>
```

Inside your test:

```js
import ReactTestUtils from 'react-dom/test-utils';
import {buttonTestkitFactory} from 'wix-style-react/testkit';

const myFormWrapper = ReactTestUtils.renderIntoDocument(<MyForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive a DOM element wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```

If you use Enzyme:

```js
import {mount} from 'enzyme';
import {buttonTestkitFactory} from 'wix-style-react/testkit/enzyme';

const myFormWrapper = mount(<MyForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive an Enzyme wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```

If you use Protractor:

```js
import {buttonTestkitFactory, waitForVisibilityOf} from 'wix-style-react/testkit/protractor';

const dataHook = 'my-button';

//Pass the data hook and expose the driver API
const driver = buttonTestkitFactory({dataHook});

//Go to your app URL which has the component in it
browser.get(appUrl);

//waitForVisibilityOf(..) waits untill the element/elements appears, and starts the tests.
//Otherwise it will timeout and print the 2nd arg as error message.
//This function accepts an element or an array of elements
waitForVisibilityOf(driver.element(), 'Cant find Button')
  .then(() => {

    //Do actual tests here
    expect(driver.getButtonText()).toBe('Click Me!');
    driver.click();
    expect(driver.getButtonText()).toBe('Clicked!');
  });
```
