# Tooltip component

> General tooltip and popover component.

## Tooltip TestKit API

### Polyfills

Since the tests won't be ran in a browser environment, the `<Tooltip/>` component might need some
polyfills. You can use them as follows:

```javascript
import {rangePolyfill} from 'wix-style-react/dist/testkit/polyfills';

beforeAll(() => {
  rangePolyfill.install();
});
```

### Enzyme / ReactTestUtils

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isShown | - | boolean | true when to tooltip itself is visible |
| focus | - | - | focus on the tooltip element |
| blue | - | - | blur the tooltip element |
| click | - | - | click on the tooltip element |
| mouseEnter | - | - | simulate mouse enter the tooltip element |
| mouseLeave | - | - | simulate mouse leave the tooltip element |
| hasErrorTheme | - | boolean | true if the tooltip itself uses error theme | 
| hasDarkTheme | - | boolean | true if the tooltip itself uses dark theme | 
| hasLightTheme | - | boolean | true if the tooltip itself uses light theme | 
| hasArrow | - | boolean | true if the tooltip has an arrow | 
| getTooltipWrapper | - | element | return the wrapper that wraps the tooltip itself and the tooltip element |
| getChildren | - | element | return the tooltip children | 
| getPlacement | - | string | return the tooltip placement | 
| getContent | - | element | return the tooltip content | 

### Puppeteer

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| element | - | element | returns the element |
| getTooltipTextContent | number | string | get the tooltip context text |

## Usage Example

### Cleanup

When Tooltip is unmounted, it immediately removes any opened Tooltip content (with no timers). So It is enough to simply unmount it. (No need to wait for anything)

### Example Enzyme

```javascript
import React from 'react';
import eventually from 'wix-eventually';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

describe('my description', () => {
  it('my test', () =>{
    const dataHook = 'myDataHook';
    const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
    const testkit = enzymeTooltipTestkitFactory({wrapper, dataHook});

    //Do tests
    testkit.mouseEnter();
    expect(testkit.isShown()).toBeFalsy(); // This is just to demonstrate that you need to wait for it
    return eventually(() => expect(testkit.isShown()).toBeTruthy());

    // Cleanup
    wrapper.unmount();
  });
});
```

### Example Plain React

We recommend using `react-testing-library`.

```javascript
  import React from 'react';
  import {render, cleanup} from 'react-testing-library';
  import eventually from 'wix-eventually';
  import {tooltipTestkitFactory as tooltipTestkitFactory} from 'wix-style-react/dist/testkit';

describe('my description', () => {
  it('my test', () => {
    const dataHook = 'myDataHook';
    const { container : wrapper } = render(
        <Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>
      )
    );
    const testkit = tooltipTestkitFactory({wrapper, dataHook});

    // Do tests
    testkit.mouseEnter();
    expect(testkit.isShown()).toBeFalsy(); // This is just to demonstrate that you need to wait for it
    return eventually(() => expect(testkit.isShown()).toBeTruthy());

    // Cleanup
    cleanup();
  });
});
```

### Example Puppeteer

```javascript

import puppeteer from 'puppeteer';
import {tooltipTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await tooltipTestkitFactory({dataHook: 'myDataHook', page});
await page.goto(appUrl); //Your application url

expect(await testkit.getTooltipTextContent()).to.equal('my test');
```

### Working With Testkits Inside Tooltip's Content

The Tooltip may render the content onto the body. In order to get a testkit of a component in the content,
you need to set the `wrapper` as the `document.body`.

> TL;DR (Enzyme)

```js
const wrapper = mount(<Tooltip content={<Text dataHook="my-text"/>} />);
const messageBoxDriver = textTestkitFactory({wrapper: document.body, dataHook: 'my-text'});
```

> TL;DR (react-testing-library)

```js
render(<Tooltip content={<Text dataHook="my-text"/>} />);
const messageBoxDriver = textTestkitFactory({wrapper: document.body, dataHook: 'my-text'});
```

### Full example (react-testing-library)

> TooltipExample.spec.js (jest)

```js
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import eventually from 'wix-eventually';
import {tooltipTestkitFactory, textTestkitFactory} from 'wix-style-react/dist/testkit';

describe('Tooltip Example', () => {
  afterEach( () => cleanup());

  it('renders the a page with tooltip and a specific text', async () => {
    // Render
    const { container } = render(
      <div>
        <Tooltip dataHook="my-tooltip">
          <Text dataHook="my-text">Hello</Text>
        </Tooltip>
      </div>
    );

    // create testkits
    const tooltipTestkit = tooltipTestkitFactory({ wrapper: container, dataHook: 'my-tooltip' });

    //open the tooltip
    tooltipDriver.mouseEnter();
    expect(modalDriver.isShown()).toBeTruthy();

    // use textTestkit
    const textTestkit = textTestkitFactory({ wrapper: document.body, dataHook: 'my-text' });
    expect(textTestkit.getText()).toBe('Hello');
  });
});
```