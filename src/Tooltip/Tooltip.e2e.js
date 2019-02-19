import eyes from 'eyes.it';
import { tooltipTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { getStoryUrl } from '../../test/utils/storybook-helpers';
import { SHORT_CONTENT, LONG_CONTENT } from '../../stories/Tooltip/content';
import { Category } from '../../stories/storiesHierarchy';

describe('Tooltip', () => {
  const tooltipStoryUrl = getStoryUrl(
    Category.TOOLTIP_AND_POPOVER,
    '7.1. Tooltip',
  );

  const dataHook = 'tooltip-e2e-wrapper';
  const tooltipDataHook = 'tooltip-e2e-tooltip';

  describe('Tooltip story', () => {
    beforeEach(() => {
      browser.get(tooltipStoryUrl);
    });

    eyes.it('should see tooltip centered above element', () => {
      const driver = tooltipTestkitFactory({ dataHook });

      waitForVisibilityOf(
        driver.getTooltipContentElement(tooltipDataHook),
        'Cannot find Tooltip content',
      ).then(() => {
        expect(driver.getTooltipTextContent(tooltipDataHook)).toBe(
          SHORT_CONTENT,
        );
      });
    });

    eyes.it(
      'should see tooltip centered above element with longer content',
      () => {
        const driver = tooltipTestkitFactory({ dataHook });

        waitForVisibilityOf(
          driver.getTooltipContentElement(tooltipDataHook),
          'Cannot find Tooltip content',
        ).then(() => {
          driver.clickButton();
          waitForVisibilityOf(
            driver.getTooltipContentElement(tooltipDataHook),
            'Cannot find Tooltip content',
          ).then(() => {
            expect(driver.getTooltipTextContent(tooltipDataHook)).toBe(
              LONG_CONTENT,
            );
          });
        });
      },
    );

    eyes.it('should show tooltip in popover mode', async () => {
      const EC = protractor.ExpectedConditions;
      const driver = tooltipTestkitFactory({ dataHook });
      await driver
        .element()
        .$('[data-hook="popover-button"]')
        .click();
      eyes.checkWindow('Check tooltip with popover styles');
      await waitForVisibilityOf(
        driver.getTooltipContentElement(tooltipDataHook),
        'Cannot find Tooltip content',
      );
      await driver
        .element()
        .$(`[data-hook="tooltip-anchor"]`)
        .click();
      await browser.wait(
        EC.not(EC.presenceOf(driver.getTooltipContentElement(tooltipDataHook))),
      );
      eyes.checkWindow('Check that we do not have tooltip content');
      await driver
        .element()
        .$(`[data-hook="tooltip-anchor"]`)
        .click();
      await waitForVisibilityOf(
        driver.getTooltipContentElement(tooltipDataHook),
        'Cannot find Tooltip content',
      );
    });
  });
});
