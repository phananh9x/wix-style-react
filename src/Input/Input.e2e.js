import { eyesItInstance } from '../../test/utils/eyes-it';
import { inputTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

import { getTestStoryKind, Category } from '../../stories/storiesHierarchy';

describe('Input', () => {
  const eyes = eyesItInstance();

  const kind = getTestStoryKind({
    category: Category.COMPONENTS,
    storyName: 'Input',
  });

  eyes.it('should render with correct prefix group', async () => {
    const driver = inputTestkitFactory({ dataHook: 'wsr-input' });
    const url = createStoryUrl({
      kind,
      story: '1. Input with suffix group',
    });
    await browser.get(url);
    await waitForVisibilityOf(driver.element(), 'Cannot find Input component');
  });

  eyes.it('should render with correct suffix group', async () => {
    const driver = inputTestkitFactory({ dataHook: 'wsr-input' });
    const url = createStoryUrl({
      kind,
      story: '2. Input with prefix group',
    });
    await browser.get(url);
    await waitForVisibilityOf(driver.element(), 'Cannot find Input component');
  });

  eyes.it('should render input component', async () => {
    const driver = inputTestkitFactory({ dataHook: 'wsr-input-with-value' });
    const url = createStoryUrl({
      kind,
      story: '3. Input',
    });
    await browser.get(url);
    await waitForVisibilityOf(driver.element(), 'Cannot find Input component');

    expect(await driver.getText()).toEqual('hello');
  });
});
