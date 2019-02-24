import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { noBorderInputTestkitFactory } from '../../testkit/protractor';
import { storySettings } from '../../stories/NoBorderInput/storySettings';

const eyes = eyesItInstance();

describe('NoBorderInput', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = noBorderInputTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <NoBorderInput/> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(await driver.element());

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });

  eyes.it('should focus the input', async () => {
    const driver = await createDriver();
    expect(await driver.isFocused()).toBe(false);

    driver.click();

    expect(await driver.isFocused()).toBe(true);
  });

  eyes.it('should enter some text', async () => {
    const someText = 'cool';
    const driver = await createDriver();
    expect(driver.getText()).toEqual('');

    driver.enterText(someText);

    expect(driver.getText()).toEqual(someText);
  });
});
