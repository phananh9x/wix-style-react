import eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { storySettings } from '../../stories/TableActionCell/storySettings';
import { tableActionCellTestkitFactory } from '../../testkit/protractor';

const hoverElement = element =>
  browser
    .actions()
    .mouseMove(element)
    .perform();

describe('Table Action Cell', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const verifyItem = async (name, dataHook) => {
    const driver = tableActionCellTestkitFactory({ dataHook });
    const element = driver.element();

    await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
    await scrollToElement(element);

    // Check idle
    await eyes.checkWindow(`${name} idle`);

    // Check hovered
    await hoverElement(element);
    await eyes.checkWindow(`${name} hovered`);

    // Check with PopoverMenu opened; It may not be present in all of the
    // examples, hence the try/catch block.
    try {
      await driver.getHiddenActionsPopoverMenu().click();
      await eyes.checkWindow(`${name} PopoverMenu opened`);

      // Click it again to close it
      await driver.getHiddenActionsPopoverMenu().click();
    } catch (e) {
      // ignored
    }
  };

  const examples = {
    'Blue primary action': 'story-primary-blue',
    'White primary action': 'story-primary-white',
    'Primary and secondary actions': 'story-primary-secondary',
    'Primary and hidden secondary actions': 'story-primary-hidden-secondary',
    'With custom PopoverMenu props': 'story-popover-menu-props',
    'Always visible secondary actions': 'story-always-visible-secondary',
    'Only secondary actions': 'story-only-secondary',
    'Only visible secondary actions': 'story-only-visible-secondary',
    'Primary and secondary actions with RTL': 'story-primary-secondary-rtl',
    'Primary action disabled': 'story-primary-disabled',
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  Object.entries(examples).forEach(([name, dataHook]) => {
    eyes.it(`should render correctly for ${name}`, async () => {
      await verifyItem(name, dataHook);
    });
  });
});
