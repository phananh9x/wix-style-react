import {
  formFieldTestkitFactory,
  inputTestkitFactory,
} from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';

import {
  storySettings,
  testStories,
} from '../../stories/FormField/storySettings';

const eyes = eyesItInstance();

const storyUrl = createStoryUrl({
  kind: storySettings.kind,
  story: storySettings.storyName,
});

const testStoryUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.multipleFormFields,
});

const driver = formFieldTestkitFactory({ dataHook: 'storybook-formfield' });

describe('FormField', () => {
  describe('[AutoExample]', () => {
    beforeAll(() => browser.get(storyUrl));

    eyes.it(
      'should render with label',
      async () => {
        await autoExampleDriver.setProps({ label: 'hello' });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find FormField component',
        );
        expect(await driver.hasTopLabel()).toBeTruthy();
      },
      { version: 'no maxlength' },
    );

    eyes.it(
      'should render with label on the right',
      async () => {
        await autoExampleDriver.setProps({
          label: 'hello',
          labelPlacement: 'right',
        });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find FormField component',
        );
        expect(await driver.hasRightLabel()).toBeTruthy();
      },
      { version: 'no maxlength' },
    );

    eyes.it(
      'should render with label on the left',
      async () => {
        await autoExampleDriver.setProps({
          label: 'hello',
          labelPlacement: 'left',
        });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find FormField component',
        );
        expect(await driver.hasLeftLabel()).toBeTruthy();
      },
      { version: 'no maxlength' },
    );

    eyes.it(
      'should render as required given required and no label props',
      async () => {
        await autoExampleDriver.setProps({ required: true });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find FormField component',
        );
        expect(await driver.isRequired()).toBe(true);
      },
    );

    eyes.it('should render info icon given infoContent prop', async () => {
      await autoExampleDriver.setProps({ infoContent: 'hello' });
      await waitForVisibilityOf(
        driver.element(),
        'Cannot find FormField component',
      );
      expect(await driver.isInfoIconVisible()).toBe(true);
    });

    eyes.it('should render info icon given infoContent prop', async () => {
      await autoExampleDriver.setProps({ infoContent: 'hello' });
      await waitForVisibilityOf(
        driver.element(),
        'Cannot find FormField component',
      );
      expect(await driver.isInfoIconVisible()).toBe(true);
    });

    eyes.it(
      'should not stretch the children when stretchContent prop is false',
      async () => {
        await autoExampleDriver.setProps({ stretchContent: false });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find FormField component',
        );
        expect(await driver.isContentStretched()).toBeFalsy();
      },
    );
  });

  eyes.it('should render length count', async () => {
    await browser.get(testStoryUrl);
    const formFieldDriver = formFieldTestkitFactory({
      dataHook: 'storybook-formfield-length-count',
    });
    const element = formFieldDriver.element();
    const inputDriver = inputTestkitFactory({
      dataHook: 'storybook-formfield-length-count-input',
    });
    await waitForVisibilityOf(element, 'Cannot find FormField component');
    await scrollToElement(element);
    await eyes.checkWindow('count is zero');
    await inputDriver.enterText('11111-11111');
    await inputDriver.enterText('11111-11111-11111-11111');
  });

  eyes.it('should render length count when label is inline', async () => {
    await browser.get(testStoryUrl);
    const formFieldDriver = formFieldTestkitFactory({
      dataHook: 'storybook-formfield-inline-label-length-count',
    });
    const element = formFieldDriver.element();
    const inputDriver = inputTestkitFactory({
      dataHook: 'storybook-formfield-inline-label-length-count-input',
    });
    await waitForVisibilityOf(element, 'Cannot find FormField component');
    await scrollToElement(element);
    await eyes.checkWindow('count is zero');
    await inputDriver.enterText('11111-11111');
    await inputDriver.enterText('11111-11111-11111-11111');
  });

  eyes.it('should be rendered within Grid', async () => {
    await browser.get(testStoryUrl);
    const formFieldDriver = formFieldTestkitFactory({
      dataHook: 'storybook-formfield-grid',
    });

    expect(formFieldDriver.element().isDisplayed()).toBeTruthy();
  });
});
