import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { tagTestkitFactory } from '../../testkit/protractor';
import { tooltipTestkitFactory } from 'wix-ui-core/dist/src/testkit/protractor';
import { createAutoExampleProps } from '../../stories/utils/AutoExampleWrapperContants';

import { storySettings } from './docs/storySettings';

describe('Tag', () => {
  const eyes = eyesItInstance();

  const url = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });

  const tagDriver = tagTestkitFactory({ dataHook: 'story-tag' });

  describe('AutoExample', () => {
    beforeAll(async () => {
      await browser.get(url);
    });

    afterEach(() => {
      return autoExampleDriver.remount();
    });

    function sizesTests(autoExampleProps) {
      function setProps(props) {
        return autoExampleDriver.setProps({
          ...props,
          ...createAutoExampleProps(autoExampleProps),
        });
      }
      ['tiny', 'small', 'medium', 'large'].forEach(size => {
        eyes.it(`should render ${size} size properly`, async () => {
          await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
          await setProps({ size });
          await eyes.checkWindow(`${size} size`);
          await setProps({ story__withThumb: true }); // story__withThumb is a story prop
          await eyes.checkWindow(`${size} size`);
          await setProps({ removable: false });
          await eyes.checkWindow(`${size} size: without remove button`);
        });
      });
    }

    describe('LTR', () => {
      sizesTests({});
    });

    describe('RTL', () => {
      sizesTests({ rtl: true });
    });

    eyes.it('should render themes', async () => {
      await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
      autoExampleDriver.setProps({ theme: 'error' });
      await eyes.checkWindow('theme: error');
      autoExampleDriver.setProps({ theme: 'warning' });
      await eyes.checkWindow('theme: warning');
    });

    eyes.it('should render disabled', async () => {
      await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
      autoExampleDriver.setProps({ disabled: true });
      await eyes.checkWindow('disabled');
    });

    eyes.it(
      'should show tooltip on hover when text is truncated with ellipses',
      async () => {
        const dataHook = 'story-tag';
        await autoExampleDriver.setProps({ wrap: true, maxWidth: 70 });
        const _tagDriver = tagTestkitFactory({ dataHook });
        const tooltipDriver = tooltipTestkitFactory({ dataHook });
        await waitForVisibilityOf(_tagDriver.element(), 'Cannot find Tag');
        expect(await tooltipDriver.isContentElementExists()).toBeFalsy();
        await tooltipDriver.mouseEnter();
        expect(await tooltipDriver.isContentElementExists()).toBeTruthy();
      },
    );
  });

  describe('TestPage', () => {
    const getTestUrl = rtl =>
      createTestStoryUrl({
        kind: storySettings.category,
        story: storySettings.storyName,
        testName: '1. Thumb Variations',
        rtl,
      });

    describe('LTR', () => {
      eyes.it('should render all thumb variations', async () => {
        await browser.get(getTestUrl());
      });
    });

    describe('RTL', () => {
      eyes.it('should render all thumb variations', async () => {
        await browser.get(getTestUrl(true));
      });
    });
  });
});
