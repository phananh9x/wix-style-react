# TextButton Testkits

## TextButton TestKit API

| method               | arguments | returned value     | description                        |
| -------------------- | --------- | ------------------ | ---------------------------------- |
| exists               | -         | `Promise<boolean>` | returns true if element in the DOM |
| element              | -         | `Promise<element>` | returns the component element      |
| click                | -         | `Promise<void>`    | clicks on the button               |
| getButtonTextContent | -         | `Promise<string>`  | returns button text                |
| isButtonDisabled     | -         | `Promise<boolean>` | returns true if button is disabled |

## ReactTestUtils Example

```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TextButton from 'wix-style-react/TextButton';
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <TextButton dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(component, { dataHook })
);

const testkit = textButtonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import TextButton from 'wix-style-react/TextButton';
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';
const wrapper = mount(
  <div>
    <TextButton dataHook={dataHook} />
  </div>
);

const testkit = textButtonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<TextButton dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await textButtonTestkitFactory({
  dataHook: 'myDataHook',
  page,
});
await page.goto('/page-where-button-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Protractor Example

> Element should be rendered with a data-hook into the DOM `<TextButton dataHook="myDataHook" />`

```javascript
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = textButtonTestkitFactory({ dataHook: 'myDataHook' });

await browser.get('/page-where-button-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
