# Test Drivers

Test drivers have two purposes:

- Provide an abstraction of component implementation. Making Tests independent of implementation changes.
- Provide an abstraction of complex user interactions with the component.

## Driver Types

### UniDriver (for every new component)

All component drivers in this library should be built on top of [unidriver](https://github.com/wix-incubator/unidriver). `unidriver` is a tool to write universal component drivers that can be reused in all test platforms (e.g. ReactDOM/JSDOM, Protractor, Puppeteer, etc...).

### Legacy Drivers (for existing components)

The library still contain a lot of platform specific drivers, mainly for the following ones:

- `enzyme` and `vanilla` for regular dom (or JSDOM) interaction. (vanilla is a legacy BAD naming for React+JSDOM drivers)
- `protractor` for browser interaction.
- `puppeteer` for browser interaction.

We will slowly migrate to use only unidriver, but in the meanwhile both still exist.

### Composing UniDriver With Legacy Drivers

If your component's `unidriver` is composing other components that don’t use unidriver, please make sure to create a new `ConsumedComponent.uni.driver.js` next to the consumed component. You can start by implementing only the required functions and not the entire driver.
Please open an inssue in this case, stating that the new `ConsumedComponent.uni.driver.js` is partially implemented.

## Public And Private Drivers

1. The **Public** drivers (`Component.uni.driver.js`) are the ones that exposed to the consumers of the components. They should be simple abstractions over common actions (for example, selecting the third element in the dropdown).
2. The **Private** drivers (`Component.private.uni.driver.js`) are used for actions on a component that should not be exposed to the user. For example, asserting a class name existance on some component.
3. The Private drivers are extending the public ones and should be used internally when testing the components.

## Writing Drivers

See [Test Drivers Guidelines](./TEST_DRIVERS_GUIDELINES.md) for best-practices when writing test drivers.

## Testing Drivers

Public drivers are also published code that needs to be tested.
We test them simply by using them in our component tests.

### Just a small but very common Gatchas

If you write a boolean driver method (e.g. `isDisabled()`), remember to test it's related feature both ways!

For example:

```js
describe('Disabled', ()=>{
  it('should NOT be disabled by default', ()=>{
    const {driver} = render(<Comp/>);
    expect(driver.isDisabled()).toBe(false);
  });

  it('should be disabled by default', ()=>{
    const {driver} = render(<Comp disabled/>);
    expect(driver.isDisabled()).toBe(true);
  })
});
```

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
