import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { emptyStateTestkitFactory } from '../../testkit/protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { storySettings } from '../../stories/components/EmptyState/storySettings';

describe('EmptyState', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });

  const createDriverFactory = async (dataHook = 'storybook-empty-state') => {
    const driver = emptyStateTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      'Cannot find EmptyState component',
    );
    await scrollToElement(driver.element());
    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  beforeEach(async () => {
    await autoExampleDriver.reset();
  });

  eyes.it(`should render for 'page' theme`, async () => {
    await autoExampleDriver.setProps({ theme: 'page' });
    await createDriverFactory();
  });

  eyes.it(`should render for 'page-no-border' theme`, async () => {
    await autoExampleDriver.setProps({ theme: 'page-no-border' });
    await createDriverFactory();
  });

  eyes.it(`should render for 'section' theme`, async () => {
    await autoExampleDriver.setProps({ theme: 'section' });
    await createDriverFactory();
  });

  eyes.it('should render without a title', async () => {
    await autoExampleDriver.setProps({ title: '' });
    await createDriverFactory();
  });

  eyes.it('should render without a subtitle', async () => {
    await autoExampleDriver.setProps({ subtitle: '' });
    await createDriverFactory();
  });
});
