import eyes from 'eyes.it';
import {
  buttonTestkitFactory,
  messageBoxFunctionalLayoutTestkitFactory,
} from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from './docs/storySettings';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function verifyItem(dataHook) {
  const element = byDataHook(dataHook);
  await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
  await scrollToElement(element);
  await eyes.checkWindow(dataHook);
}

describe('MessageBox', () => {
  describe('Alert', () => {
    const standard = 'alert-standard';
    const secondary = 'alert-secondary';
    const footnote = 'alert-footnote';
    const emptyState = 'alert-empty-state';
    const scrollable = 'alert-scrollable';
    const image = 'alert-image';
    const actions = 'alert-actions';
    const imageWithActions = 'alert-image-actions';

    eyes.it('should not break design', async () => {
      await browser.get(createStoryUrl({ ...storySettings.alert }));

      await verifyItem(standard);
      await verifyItem(secondary);
      await verifyItem(footnote);
      await verifyItem(emptyState);
      await verifyItem(scrollable);
      await verifyItem(image);
      await verifyItem(actions);
      await verifyItem(imageWithActions);
    });

    eyes.it('should not break design RTL', async () => {
      await browser.get(createStoryUrl({ ...storySettings.alert, rtl: true }));

      await verifyItem(actions);
    });

    eyes.it(
      'should show footer border for scrollable modal and hide the border when scroll is on the bottom',
      async () => {
        await browser.get(createStoryUrl({ ...storySettings.alert }));
        await verifyItem(scrollable);

        const driver = messageBoxFunctionalLayoutTestkitFactory({
          dataHook: scrollable,
        });
        const SMALL_SCROLL_OFFSET = 50;
        const MAX_SCROLL_OFFSET = 500;

        expect(await driver.toHaveFooterBorder()).toBe(true);

        await driver.scrollBodyDown(SMALL_SCROLL_OFFSET);
        expect(await driver.toHaveFooterBorder()).toBe(true);

        await driver.scrollBodyDown(MAX_SCROLL_OFFSET);
        expect(await driver.toHaveFooterBorder()).toBe(false);
      },
    );
  });

  describe('Destructive Alert', () => {
    const standard = 'destructive-alert-standard';
    const secondary = 'destructive-alert-secondary';

    eyes.it('should not break design', async () => {
      await browser.get(createStoryUrl({ ...storySettings.destructive }));
      await verifyItem(standard);
      await verifyItem(secondary);
    });
  });

  describe('Custom Modal', () => {
    eyes.it('should open full screen modal', async () => {
      await browser.get(createStoryUrl({ ...storySettings.custom }));
      const button = buttonTestkitFactory({
        dataHook: 'open-full-screen-modal-button',
      });
      button.click();
      await verifyItem('fullscreen-modal');
    });
  });

  describe('Announcement', () => {
    const standard = 'announcement-standard';
    const primaryTheme = 'announcement-primary-theme';
    const footnote = 'announcement-footnote';
    const disabledAction = 'announctement-disabled-action';

    eyes.it('should not break design', async () => {
      await browser.get(createStoryUrl({ ...storySettings.announcement }));
      await verifyItem(standard);
      await verifyItem(primaryTheme);
      await verifyItem(footnote);
      await verifyItem(disabledAction);
    });

    eyes.it('should not break design RTL', async () => {
      await browser.get(
        createStoryUrl({ ...storySettings.announcement, rtl: true }),
      );
      await verifyItem(standard);
    });
  });
});
