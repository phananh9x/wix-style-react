import {
  createStoryUrl,
  waitForVisibilityOf,
  protractorUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import richTextInputAreaPrivateDriverFactory from './RichTextInputArea.private.driver';
import { storySettings } from '../../stories/RichTextInputArea/storySettings';

const eyes = eyesItInstance();

describe('RichTextInputArea', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = protractorUniTestkitFactoryCreator(
      richTextInputAreaPrivateDriverFactory,
    )({
      dataHook,
    });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <RichTextInputArea/> component with dataHook of ${dataHook}`,
    );

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });

  eyes.it('should enter simple text', async () => {
    const driver = await createDriver();
    await driver.enterText('This is a rich text area');
  });

  eyes.it(
    `should change the text area's background color on hover`,
    async () => {
      const driver = await createDriver();
      await driver.hoverTextArea();
    },
  );

  eyes.it(`should change the text area's border on click`, async () => {
    const driver = await createDriver();
    await driver.clickTextArea();
  });

  eyes.it('should render with rich text', async () => {
    await createDriver('story-rich-text-input-area-live-example');
  });
});
