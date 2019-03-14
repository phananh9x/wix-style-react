import eyes from 'eyes.it';
import { statsWidgetTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

const storyUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.statsWidget,
});

describe('StatsWidget', () => {
  eyes.it('should show proper amount of statistics', () => {
    const driver = statsWidgetTestkitFactory({
      dataHook: storySettings.dataHook,
    });

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find StatsWidget').then(
      () => {
        expect(driver.numberOfStatistics()).toBe(3);
      },
    );
  });
});
