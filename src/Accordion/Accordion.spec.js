import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Accordion from './Accordion';
import { accordionPrivateDriverFactory } from './Accordion.private.driver';

import { eventually } from '../../test/utils/unit/eventually';
import { BUTTON_TYPES } from './constants';

describe('Accordion', () => {
  const FakeIcon = () => <div>fake icon</div>;
  const createDriver = createUniDriverFactory(accordionPrivateDriverFactory);

  describe('items data', async () => {
    it('should render a list of items', async () => {
      const data = [
        {
          title: 'first item',
        },
      ];
      const driver = createDriver(<Accordion data={data} />);
      expect(await driver.getItemTitleAt(0)).toEqual('first item');
    });

    it('should not render any items', async () => {
      const driver = createDriver(<Accordion />);
      expect(await driver.getAmmountOfItems()).toEqual(0);
    });

    it('should render item with icon', async () => {
      const data = [
        {
          title: 'first item',
          icon: <FakeIcon />,
          content: 'first item content',
        },
      ];
      const driver = createDriver(<Accordion data={data} />);
      expect(await driver.isIconExistsAt(0)).toBeTruthy();
    });

    it('should render item without an icon', async () => {
      const data = [
        {
          title: 'first item',
          content: 'first item content',
        },
      ];
      const driver = createDriver(<Accordion data={data} />);
      expect(await driver.isIconExistsAt(0)).toBeFalsy();
    });
  });

  describe('exapnd and collapse behavior', () => {
    const singleItem = [
      {
        title: 'first item',
        icon: <FakeIcon />,
        content: 'first item content',
        expandLabel: 'see more',
        collapseLabel: 'see less',
        buttonType: BUTTON_TYPES.BUTTON,
      },
    ];

    const multipleItems = [
      {
        title: 'first item',
        icon: <FakeIcon />,
        content: 'first item content',
        expandLabel: 'see more',
        collapseLabel: 'see less',
        buttonType: BUTTON_TYPES.BUTTON,
      },
      {
        title: 'second item',
        icon: <FakeIcon />,
        content: 'second item content',
        expandLabel: 'see more',
        collapseLabel: 'see less',
        buttonType: BUTTON_TYPES.BUTTON,
      },
    ];

    it('should display a collapsed item by default', async () => {
      const driver = createDriver(<Accordion data={singleItem} />);
      expect(await driver.isItemExpandedAt(0)).toBeFalsy();
    });

    it('should expand an item on click', async () => {
      const driver = createDriver(<Accordion data={singleItem} />);
      await driver.clickToggleButtonAt(0);
      expect(await driver.isItemExpandedAt(0)).toBeTruthy();
    });

    it('should accept an expand and collapse button labels', async () => {
      const driver = createDriver(<Accordion data={singleItem} />);
      await driver.hoverOnItem(0);
      expect(await driver.getToggleButtonLabelAt(0)).toEqual('see more');
      await driver.clickToggleButtonAt(0);
      expect(await driver.getToggleButtonLabelAt(0)).toEqual('see less');
    });

    it('should allow only a single item to be expanded by default', async () => {
      const driver = createDriver(<Accordion data={multipleItems} />);

      await driver.clickToggleButtonAt(0);
      await driver.clickToggleButtonAt(1);
      await eventually(async () =>
        expect(await driver.isItemExpandedAt(0)).toBeFalsy(),
      );
      expect(await driver.isItemExpandedAt(1)).toBeTruthy();
    });
  });
});
