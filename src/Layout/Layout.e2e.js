import eyes from 'eyes.it';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

import storySettings from './docs/storySettings';

describe('Layout', () => {
  [
    storySettings.holyGrailLayout,
    storySettings.listOfCards,
    storySettings.mainAndSide,
    storySettings.form,
  ].forEach(story =>
    eyes.it(`should render ${story}`, async () => {
      const url = createStoryUrl({
        kind: storySettings.examplesCategory,
        story,
      });
      await browser.get(url);
      await eyes.checkWindow(story);
    }),
  );
});
