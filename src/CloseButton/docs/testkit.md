# CloseButton Testkits

> CloseButton

## CloseButton TestKit API

| method           | arguments | returned value | description                        |
| ---------------- | --------- | -------------- | ---------------------------------- |
| exists           | -         | boolean        | returns true if element in the DOM |
| element          | -         | element        | returns the component element      |
| click            | -         | -              | clicks on the button               |
| isButtonDisabled | -         | boolean        | returns true if button is disabled |

## ReactTestUtils Example

```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import CloseButton from 'wix-style-react/CloseButton';
import { closeButtonTestkitFactory } from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <CloseButton dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(component, { dataHook })
);

const testkit = closeButtonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import CloseButton from 'wix-style-react/CloseButton';
import { closeButtonTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';
const wrapper = mount(
  <div>
    <CloseButton dataHook={dataHook} />
  </div>
);

const testkit = closeButtonTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<CloseButton dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { closeButtonTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await closeButtonTestkitFactory({
  dataHook: 'myDataHook',
  page,
});
await page.goto('/page-where-closebutton-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Protractor Example

> Element should be rendered with a data-hook into the DOM `<CloseButton dataHook="myDataHook" />`

```javascript
import { closeButtonTestkitFactory } from 'wix-style-react/dist/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = closeButtonTestkitFactory({ dataHook: 'myDataHook' });

await browser.get('/page-where-closebutton-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
