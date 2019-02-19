# Button Testkits

> Button

## Button TestKit API

| method               | arguments | returned value     | description                        |
| -------------------- | --------- | ------------------ | ---------------------------------- |
| exists               | -         | `Promise<boolean>` | returns true if element in the DOM |
| element              | -         | `Promise<element>` | returns the component element      |
| click                | -         | `Promise<void>`    | clicks on the button               |
| getButtonTextContent | -         | `Promise<string>`  | returns the button text            |
| isButtonDisabled     | -         | `Promise<boolean>` | returns true if button is disabled |

## ReactTestUtils Example

```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Button from 'wix-style-react/Button';
import { buttonTestkitFactory } from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <Button dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(component, { dataHook })
);

const testkit = buttonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import Button from 'wix-style-react/Button';
import { buttonTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';
const wrapper = mount(
  <div>
    <Button dataHook={dataHook} />
  </div>
);

const testkit = buttonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<Button dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { buttonTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await buttonTestkitFactory({ dataHook: 'myDataHook', page });
await page.goto('/page-where-button-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Protractor Example

> Element should be rendered with a data-hook into the DOM `<Button dataHook="myDataHook" />`

```javascript
import { buttonTestkitFactory } from 'wix-style-react/dist/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = buttonTestkitFactory({ dataHook: 'myDataHook' });

await browser.get('/page-where-button-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
