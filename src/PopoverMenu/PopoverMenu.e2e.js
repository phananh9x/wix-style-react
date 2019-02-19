import browserLogs from 'protractor-browser-logs';
import { eyesItInstance } from '../../test/utils/eyes-it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { storySettings } from '../../stories/PopoverMenu/storySettings';
import { Category } from '../../stories/storiesHierarchy';

const EC = protractor.ExpectedConditions;

import { popoverMenuTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

describe('PopoverMenu', () => {
  const eyes = eyesItInstance();

  let driver;
  const logs = browserLogs(browser);

  async function getPage({ rtl } = {}) {
    const storyUrl = createStoryUrl({
      kind: Category.TOOLTIP_AND_POPOVER,
      story: '7.3 Popover Menu',
      withExamples: false,
      rtl,
    });
    logs.reset();
    logs.ignore(message => message.message.indexOf('Uncaught') === -1);

    driver = popoverMenuTestkitFactory({
      dataHook: storySettings.dataHook,
    }).init.menuItemDataHook(storySettings.itemDataHook);
    await browser.get(storyUrl);
  }

  async function getPageWithDividerMenu({ rtl } = {}) {
    const storyUrl = createStoryUrl({
      kind: Category.TOOLTIP_AND_POPOVER,
      story: '7.3 Popover Menu',
      withExamples: true,
      rtl,
    });
    logs.ignore(message => message.message.indexOf('Uncaught') === -1);

    driver = popoverMenuTestkitFactory({
      dataHook: storySettings.dataHookDivider,
    }).init.menuItemDataHook(storySettings.itemDataHookDivider);
    await browser.get(storyUrl);
  }

  eyes.it('should show popover menu', async () => {
    await getPage();
    await waitForVisibilityOf(
      driver.element(),
      'Can not find PopoverMenu trigger element',
    );
    await driver.click();

    waitForVisibilityOf(driver.menu.element(), 'Can not find PopoverMenu menu');
  });

  describe('RTL', () => {
    afterEach(() => {
      return autoExampleDriver.remount();
    });

    eyes.it('should show popover menu', async () => {
      await getPage({ rtl: true });
      await autoExampleDriver.setProps({ placement: 'left' });
      await waitForVisibilityOf(
        driver.element(),
        'Can not find PopoverMenu trigger element',
      );
      await driver.click();

      await waitForVisibilityOf(
        driver.menu.element(),
        'Can not find PopoverMenu menu',
      );
    });
  });

  it('should hide popover menu on item click', async () => {
    await getPage();
    await waitForVisibilityOf(driver.element());
    await driver.click();

    await waitForVisibilityOf(driver.menu.element());
    await driver.menu.clickItemAt(0);

    await browser.wait(
      EC.stalenessOf(driver.menu.element()),
      5000,
      'PopoverMenu has not been hidden after menu item click',
    );
  });

  it('should contains divider', async () => {
    await getPageWithDividerMenu();
    await waitForVisibilityOf(driver.element());
    await driver.click();
    await waitForVisibilityOf(driver.menu.element());

    await browser.wait(
      waitForVisibilityOf(
        driver.menu.element(
          by.css(`[data-hook="${storySettings.itemDataHookDivider}"]`),
        ),
      ),
      1000,
      'PopoverMenu has no divider',
    );
  });

  describe('regression tests', () => {
    it('Uncaught TypeError: https://github.com/wix/wix-style-react/issues/2113', async () => {
      const storyUrl = createStoryUrl({
        kind: 'Tests/7. Tooltip',
        story: '7.3. Popover Menu',
      });
      await browser.get(storyUrl);

      driver = popoverMenuTestkitFactory({
        dataHook: 'popover-0',
      }).init.menuItemDataHook('popover-item-0');

      await waitForVisibilityOf(driver.element());

      await driver.click();

      await waitForVisibilityOf(driver.menu.element());

      await driver.menu.clickItemAt(0);

      await browser.wait(
        EC.stalenessOf(driver.menu.element()),
        5000,
        'PopoverMenu has not been hidden after menu item click',
      );

      await browser.wait(
        EC.stalenessOf(driver.element()),
        5000,
        'PopoverMenu has not been removed after menu item click',
      );

      logs.expect(
        /Uncaught TypeError: Cannot read property 'parentElement' of null/,
      );
      await logs
        .verify()
        .then(() => {
          fail('Expected error occurred');
        })
        .catch(e => {
          expect(e.message).toContain('NO MESSAGE TO EXPECT');
        });
    });
  });
});
