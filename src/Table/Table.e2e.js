import eyes from 'eyes.it';

import {
  tableTestkitFactory,
  tableActionCellTestkitFactory,
} from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { flattenInternalDriver } from '../../test/utils/private-drivers';
import { storySettings } from '../../stories/Table/storySettings';

describe('Table', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const init = async (dataHook = 'storybook-table') => {
    await browser.get(storyUrl);
    const driver = tableTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element, 'Can not find Table Component');
    await scrollToElement(driver.element);
    return flattenInternalDriver(driver);
  };

  it('should be able to use DataTable driver methods', async () => {
    const driver = await init();
    expect(await driver.rowsCount()).toBe(4);
  });

  eyes.it('should display table only', async () => {
    const driver = await init();
    await scrollToElement(driver.element);
  });

  eyes.it('should render with an EmptyState', async () => {
    const driver = await init('story-table-empty-state-example');
    await scrollToElement(driver.element);
  });

  eyes.it('should render with an columns alignments', async () => {
    const driver = await init('story-table-column-alignment-example');
    await scrollToElement(driver.element);
  });
  eyes.it('should render with an selection disabled', async () => {
    const driver = await init('story-table-selection-disabled-example');
    await scrollToElement(driver.element);
  });

  describe('Action cell', () => {
    describe('Primary action only', () => {
      const createDriver = () => init('story-action-cell-primary-example');

      eyes.it(
        'should show a primary action placeholder and hide it on row hover',
        async () => {
          const tableDriver = await createDriver();
          const actionCellDriver = tableActionCellTestkitFactory({
            dataHook: 'action-cell-component-primary',
          });

          expect(
            actionCellDriver.getPrimaryActionPlaceholder().isDisplayed(),
          ).toBe(true);
          expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(
            false,
          );
          expect(tableDriver.getRow(0).getCssValue('background-color')).toEqual(
            'rgba(0, 0, 0, 0)',
          );

          tableDriver.hoverRow(0);

          expect(
            actionCellDriver.getPrimaryActionPlaceholder().isDisplayed(),
          ).toBe(false);
          expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(
            true,
          );
          expect(
            tableDriver.getRow(0).getCssValue('background-color'),
          ).not.toEqual('rgba(0, 0, 0, 0)');

          tableDriver.hoverRow(1);
        },
      );
    });

    describe('Primary and secondary actions', () => {
      const createDriver = () =>
        init('story-action-cell-primary-secondary-example');

      eyes.it(
        'should always show the PopoverMenu, and show the primary and secondary actions only on hover',
        async () => {
          const tableDriver = await createDriver();
          const actionCellDriver = tableActionCellTestkitFactory({
            dataHook: 'action-cell-component-secondary',
          });

          expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(
            false,
          );
          expect(
            actionCellDriver.getVisibleActionsWrapper().isDisplayed(),
          ).toBe(false);
          expect(
            actionCellDriver.getHiddenActionsPopoverMenu().isDisplayed(),
          ).toBe(true);

          tableDriver.hoverRow(0);

          expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(
            true,
          );
          expect(
            actionCellDriver.getVisibleActionsWrapper().isDisplayed(),
          ).toBe(true);
          expect(
            actionCellDriver.getHiddenActionsPopoverMenu().isDisplayed(),
          ).toBe(true);

          tableDriver.hoverRow(1);
        },
      );
    });
  });
});
