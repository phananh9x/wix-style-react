import eyes from 'eyes.it';
import { sectionHelperTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from './docs/storySettings';

describe('SectionHelper', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });
  const testkit = sectionHelperTestkitFactory({
    dataHook: 'storybook-sectionhelper',
  });

  eyes.it('should render default props', async () => {
    await browser.get(storyUrl);
    await waitForVisibilityOf(testkit.element());
  });
});
