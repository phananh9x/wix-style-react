import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

import { dropdownTestkitFactory } from '../../testkit/protractor';
import { storySettings } from '../../stories/Dropdown/storySettings';

describe('Dropdown', () => {
  const eyes = eyesItInstance();

  const autoExampleUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
    withExamples: false,
  });

  eyes.it('should display default (no options and not focused)', async () => {
    const dataHook = 'story-dropdown';
    await browser.get(autoExampleUrl);
    const driver = dropdownTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');
    expect(await driver.isOptionsShown()).toBeFalsy();
  });

  eyes.it('should display focused and with options shown', async () => {
    const dataHook = 'story-dropdown';
    await browser.get(autoExampleUrl);
    const driver = dropdownTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');
    expect(await driver.isOptionsShown()).toBeFalsy();
    await driver.getInput().click();
    expect(await driver.isOptionsShown().isDisplayed()).toBeTruthy();
  });

  eyes.it('should display options with divider', async () => {
    const dataHook = 'story-dropdown';
    await browser.get(autoExampleUrl);
    await autoExampleDriver.setProps({
      options: [
        { id: 1, value: 'op 1' },
        { id: -99, value: '-' },
        { id: 2, value: 'op 2' },
      ],
    });
    const driver = dropdownTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');
    expect(await driver.isOptionsShown()).toBeFalsy();
    await driver.getInput().click();
    expect(await driver.isOptionsShown().isDisplayed()).toBeTruthy();
  });

  describe('scrolling behaviour', () => {
    const options = Array(30)
      .fill()
      .map((v, i) => ({ id: i, value: `Option ${i}` }));
    let driver;

    const repeat = (times, fn) =>
      Array(times)
        .fill()
        .reduce(promise => promise.then(() => fn()), Promise.resolve());

    const pressArrowDown = (times = 0) =>
      repeat(times, () =>
        browser
          .actions()
          .sendKeys(protractor.Key.ARROW_DOWN)
          .perform(),
      );
    const pressArrowUp = (times = 0) =>
      repeat(times, () =>
        browser
          .actions()
          .sendKeys(protractor.Key.ARROW_UP)
          .perform(),
      );

    const getScrollTop = element =>
      browser.executeScript('return arguments[0].scrollTop', element);
    const getRectBottom = element =>
      browser.executeScript(
        'return arguments[0].getBoundingClientRect().bottom',
        element,
      );
    const getRectTop = element =>
      browser.executeScript(
        'return arguments[0].getBoundingClientRect().top',
        element,
      );

    beforeAll(async () => {
      await browser.get(autoExampleUrl);
    });

    beforeEach(async () => {
      driver = dropdownTestkitFactory({ dataHook: 'story-dropdown' });
      await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');
      await autoExampleDriver.setProps({ options });
    });

    afterEach(async () => {
      await autoExampleDriver.remount();
    });

    /*
     * In our example, the Drodpown can hold about 6 full items in the view.
     */

    eyes.it(
      'should not change scroll when hovered option is in view',
      async () => {
        await driver.getInput().click();

        // Scrolling manually 3 items down. The 3rd item should be in view.
        await pressArrowDown(3);

        // `scrollTop` should not change
        expect(await getScrollTop(driver.getDropdown())).toEqual(0);
      },
    );

    eyes.it(
      'should change scroll when hovered option is below the view',
      async () => {
        await driver.getInput().click();

        // Scrolling manually 8 items down, the 8th item should be *below* view
        await pressArrowDown(8);

        // Container and option should be aligned to the bottom
        expect(await getRectBottom(driver.getDropdown())).toEqual(
          await getRectBottom(driver.getDropdownItemElement(7)),
        );
      },
    );

    eyes.it(
      'should change scroll when hovered option is above the view',
      async () => {
        await driver.getInput().click();

        // Scroling down 16 item down, then 8 items up. The 8t item (when we
        // scrolling up) should be *above* the view
        await pressArrowDown(16);
        await pressArrowUp(8);

        // Container and option should be aligned to the top
        expect(await getRectTop(driver.getDropdown())).toEqual(
          await getRectTop(driver.getDropdownItemElement(7)),
        );
      },
    );
  });
});
