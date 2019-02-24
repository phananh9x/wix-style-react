import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

describe('Card and Grid', () => {
  const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);
  const storyUrl = createStoryUrl({ kind: 'Components', story: 'Card' });
  const eyes = eyesItInstance();

  eyes.it('should not break design', async () => {
    const dataHook = 'card-example-basic';
    const element = byDataHook(dataHook);

    await browser.get(storyUrl);
    await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
    await scrollToElement(element);
  });

  eyes.it('should not break design for the empty state example', async () => {
    const dataHook = 'card-example-empty-state';
    const element = byDataHook(dataHook);

    await browser.get(storyUrl);
    await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
    await scrollToElement(element);
  });
});
