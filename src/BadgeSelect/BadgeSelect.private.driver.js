import { badgeDriverFactory } from 'wix-ui-backoffice/dist/src/components/Badge/Badge.driver';

import popoverDriverFactory from '../Popover/Popover.driver';
import badgeSelectPublicDriverFactory from './BadgeSelect.driver';

const badgeSelectDriverFactory = ({ element, eventTrigger }) => {
  const popoverDriver = popoverDriverFactory({ element, eventTrigger });

  const badgeDriver = badgeDriverFactory({
    element: popoverDriver.getTargetElement().childNodes[0],
    eventTrigger,
  });

  const driver = {
    ...badgeSelectPublicDriverFactory({ element, eventTrigger }),

    /** Clicks on the badge */
    click: () => badgeDriver.click(),
    /** Performs a click outside the component */
    clickOutside: () => popoverDriver.clickOutside(),
    /** Whether the dropdown is shown */
    isDropdownShown: () => popoverDriver.isContentElementExists(),
  };

  return {
    driver,
    badgeDriver,
  };
};

export default badgeSelectDriverFactory;
