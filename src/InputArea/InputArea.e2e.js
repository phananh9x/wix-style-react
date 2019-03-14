import { inputAreaTestkitFactory } from '../../testkit/protractor';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { storySettings } from './docs/storySettings';
import InputArea from './InputArea';

const LONG_INPUT = 'all work and no play makes jack a dull boy\n';

describe('input area page', () => {
  const eyes = eyesItInstance({ enableSnapshotAtBrowserGet: false });

  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });
  const inputAreaTestkit = inputAreaTestkitFactory({
    dataHook: 'storybook-inputarea',
  });

  beforeEach(async () => {
    await browser.get(storyUrl);
    await waitForVisibilityOf(inputAreaTestkit.element());
    await autoExampleDriver.reset();
  });

  eyes.it('should render default props', async () => {
    expect(await inputAreaTestkit.isFocused()).toBe(false, 'isFocused');
  });

  eyes.it('should show focus styles', async () => {
    expect(await inputAreaTestkit.isFocused()).toBeFalsy();
    await browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();
    expect(await inputAreaTestkit.isFocused()).toBeTruthy();
  });

  eyes.it('should show hover styles', async () => {
    expect(await inputAreaTestkit.isHovered()).toBeFalsy();
    await inputAreaTestkit.hover();
    expect(await inputAreaTestkit.isHovered()).toBeTruthy();
  });

  eyes.it('should show hover and focus styles', async () => {
    expect(await inputAreaTestkit.isHovered()).toBeFalsy();
    expect(await inputAreaTestkit.isFocused()).toBeFalsy();
    await inputAreaTestkit.click();
    expect(await inputAreaTestkit.isFocused()).toBeTruthy();
    expect(await inputAreaTestkit.isHovered()).toBeTruthy();
  });

  eyes.it('should grow automatically with input', async () => {
    await autoExampleDriver.setProps({ autoGrow: true });
    const longValue = LONG_INPUT.repeat(10);

    await inputAreaTestkit.sendKeys(longValue);
    const offsetHeight = await inputAreaTestkit.getOffsetHeight();
    const scrollHeight = await inputAreaTestkit.getScrollHeight();

    expect(offsetHeight).toBe(scrollHeight);
  });

  eyes.it('should shrink automatically with input', async () => {
    await autoExampleDriver.setProps({ autoGrow: true });
    const longValue = LONG_INPUT.repeat(10);

    await inputAreaTestkit.sendKeys(longValue);
    const previousOffsetHeight = await inputAreaTestkit.getOffsetHeight();

    await inputAreaTestkit.sendKeys(
      protractor.Key.BACK_SPACE.repeat(LONG_INPUT.length * 4),
    );
    const currentOffsetHeight = await inputAreaTestkit.getOffsetHeight();

    expect(currentOffsetHeight < previousOffsetHeight).toBeTruthy();
  });

  eyes.it('should give precedence to rows prop', async () => {
    await autoExampleDriver.setProps({ autoGrow: true, rows: 3 });

    const previousOffsetHeight = await inputAreaTestkit.getOffsetHeight();

    const longValue = LONG_INPUT.repeat(10);

    await inputAreaTestkit.sendKeys(longValue);
    const currentOffsetHeight = await inputAreaTestkit.getOffsetHeight();

    expect(currentOffsetHeight).toBe(previousOffsetHeight);
  });

  eyes.it(
    'should grow according to input when line-height is set to "normal"',
    async () => {
      await inputAreaTestkit.setLineHeight('normal');
      await autoExampleDriver.setProps({ autoGrow: true });

      const longValue = LONG_INPUT.repeat(10);

      await inputAreaTestkit.sendKeys(longValue);
      const offsetHeight = await inputAreaTestkit.getOffsetHeight();
      const scrollHeight = await inputAreaTestkit.getScrollHeight();

      expect(offsetHeight).toBe(scrollHeight);
    },
  );

  eyes.it('should begin with miminum ammount of rows', async () => {
    await autoExampleDriver.setProps({ autoGrow: true });
    const rowCount = await inputAreaTestkit.getRowCount();
    expect(rowCount).toBe(InputArea.MIN_ROWS);
  });

  eyes.it('it does not shrink below allowed minimum rows', async () => {
    await autoExampleDriver.setProps({ autoGrow: true });
    const rowCount = await inputAreaTestkit.getRowCount();
    expect(rowCount).toBe(InputArea.MIN_ROWS);

    const numRowsToInsert = 5;
    await inputAreaTestkit.sendKeys('\n'.repeat(numRowsToInsert - 1));
    const rowCountAfterInput = await inputAreaTestkit.getRowCount();
    expect(rowCountAfterInput).toBe(numRowsToInsert);

    await inputAreaTestkit.sendKeys(
      protractor.Key.BACK_SPACE.repeat(numRowsToInsert),
    );
    const rowCountAfterDelete = await inputAreaTestkit.getRowCount();
    expect(rowCountAfterDelete).toBe(InputArea.MIN_ROWS);
  });
});
