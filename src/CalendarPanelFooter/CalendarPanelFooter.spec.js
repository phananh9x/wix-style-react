import React from 'react';
import CalendarPanelFooter, { defaultDateToStringOptions } from '.';
import { createRendererWithUniDriver, cleanup } from '../../test/utils/unit';
import { calendarPanelFooterPrivateDriverFactory } from './CalendarPanelFooter.private.driver';

describe('CalendarPanelFooter', () => {
  const render = createRendererWithUniDriver(
    calendarPanelFooterPrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  const createDefaultProps = () => ({
    primaryActionLabel: 'Update',
    secondaryActionLabel: 'Cancel',
    primaryActionDisabled: false,
    primaryActionOnClick: () => {},
    secondaryActionOnClick: () => {},
    dateToString: date =>
      date.toLocaleDateString('en-US', defaultDateToStringOptions),
    selectedDays: new Date(2018, 0, 15),
  });

  describe('selected days text', () => {
    it('should show single selected day text', async () => {
      const { driver } = render(
        <CalendarPanelFooter {...createDefaultProps()} />,
      );
      expect(await driver.getSelectedDaysText()).toBe('Jan 15, 2018');
    });

    it('should show range text', async () => {
      const selectedDays = {
        from: new Date(2018, 0, 1),
        to: new Date(2018, 0, 15),
      };
      const { driver } = render(
        <CalendarPanelFooter
          {...createDefaultProps()}
          selectedDays={selectedDays}
        />,
      );
      expect(await driver.getSelectedDaysText()).toBe(
        'Jan 1, 2018 - Jan 15, 2018',
      );
    });

    it('should show infinite range text', async () => {
      const selectedDays = {
        from: new Date(2018, 0, 1),
      };
      const { driver } = render(
        <CalendarPanelFooter
          {...createDefaultProps()}
          selectedDays={selectedDays}
        />,
      );
      expect(await driver.getSelectedDaysText()).toBe('Jan 1, 2018 -');
    });

    it('should show empty selected day text', async () => {
      const { driver } = render(
        <CalendarPanelFooter
          {...createDefaultProps()}
          selectedDays={undefined}
        />,
      );
      expect(await driver.getSelectedDaysText()).toBe('');
    });
  });

  describe('Action Buttons', () => {
    describe('Text', () => {
      it('should show primary action button text', async () => {
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            primaryActionLabel={'Custom Update'}
          />,
        );
        expect(await driver.getPrimaryActionButtonLabel()).toBe(
          'Custom Update',
        );
      });

      it('should show secondary action button text', async () => {
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            secondaryActionLabel={'Custom Cancel'}
          />,
        );
        expect(await driver.getSecondaryActionButtonLabel()).toBe(
          'Custom Cancel',
        );
      });
    });

    describe('Primary Button Disabled', () => {
      it('should show primary button as disabled when primaryActionDisabled=true', async () => {
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            primaryActionDisabled
          />,
        );
        expect(await driver.isPrimaryButtonDisabled()).toBe(true);
      });

      it('should show primary button as enabled when primaryActionDisabled=false', async () => {
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            primaryActionDisabled={false}
          />,
        );
        expect(await driver.isPrimaryButtonDisabled()).toBe(false);
      });
    });

    describe('On Click Callbacks', () => {
      it('should call primaryActionOnClick when clicking the primary button', async () => {
        const primaryActionOnClick = jest.fn();
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            primaryActionDisabled={false}
            primaryActionOnClick={primaryActionOnClick}
          />,
        );
        await driver.clickOnPrimaryButton();
        expect(primaryActionOnClick).toHaveBeenCalledTimes(1);
      });

      it('should call secondaryActionOnClick when clicking the secondary button', async () => {
        const secondaryActionOnClick = jest.fn();
        const { driver } = render(
          <CalendarPanelFooter
            {...createDefaultProps()}
            secondaryActionOnClick={secondaryActionOnClick}
          />,
        );
        await driver.clickOnSecondaryButton();
        expect(secondaryActionOnClick).toBeCalled();
      });
    });
  });
});
