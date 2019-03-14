import eyes from 'eyes.it';
import path from 'path';
import { filePickerTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { storySettings } from './docs/storySettings';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

const storyUrl = createStoryUrl({
  kind: storySettings.kind,
  story: storySettings.storyName,
});

describe('FilePicker', () => {
  eyes.it('should display filePicker', () => {
    const driver = filePickerTestkitFactory({
      dataHook: storySettings.dataHook,
    });

    browser.get(storyUrl);
    waitForVisibilityOf(driver.element(), 'Cannot find FilePicker').then(() => {
      const imagePath = '../../test/assets/surf-musa.png';
      const absolutePath = path.resolve(__dirname, imagePath);

      expect(driver.getSubLabel()).toBe('No file chosen (Max size 5 MB)');

      driver.getInput().sendKeys(absolutePath);
      expect(driver.getSubLabel()).toBe('surf-musa.png');
    });
  });
});
