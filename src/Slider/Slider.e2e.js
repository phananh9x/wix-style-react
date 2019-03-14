import eyes from 'eyes.it';
import { sliderTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';

import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

const storyUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.slider,
});

describe('Slider', () => {
  eyes.it('single handle flow', async () => {
    const driver = sliderTestkitFactory({ dataHook: storySettings.dataHook });
    let handleTooltipValue;

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cant find Slider');

    handleTooltipValue = await driver.handleTooltipValue({ index: 0 });
    expect(handleTooltipValue).toEqual(3);

    await driver.hoverHandle({ index: 0 });
    expect(driver.isHandleTooltipDisplayed()).toBe(true);

    await driver.unHoverHandle({ index: 0 });
    expect(driver.isHandleTooltipDisplayed()).toBe(false);

    driver.dragHandle({ index: 0, offset: 1 });
    handleTooltipValue = await driver.handleTooltipValue({ index: 0 });
    expect(handleTooltipValue).toBe(4);
  });

  eyes.it('multiple handles flow', async () => {
    const driver = sliderTestkitFactory({
      dataHook: `${storySettings.dataHook}-multiple`,
    });
    let handleTooltipValue;

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cant find Slider');

    handleTooltipValue = await driver.handleTooltipValue({ index: 0 });
    expect(handleTooltipValue).toEqual(2);

    handleTooltipValue = await driver.handleTooltipValue({ index: 1 });
    expect(handleTooltipValue).toEqual(6);

    handleTooltipValue = await driver.handleTooltipValue({ index: 2 });
    expect(handleTooltipValue).toEqual(8);

    driver.dragHandle({ index: 0, offset: 3 });
    handleTooltipValue = await driver.handleTooltipValue({ index: 0 });
    expect(handleTooltipValue).toEqual(4);

    handleTooltipValue = await driver.handleTooltipValue({ index: 1 });
    expect(handleTooltipValue).toEqual(6);

    handleTooltipValue = await driver.handleTooltipValue({ index: 2 });
    expect(handleTooltipValue).toEqual(8);
  });
});
