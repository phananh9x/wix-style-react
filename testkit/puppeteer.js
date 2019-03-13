import 'regenerator-runtime/runtime';
import {
  puppeteerTestkitFactoryCreator,
  puppeteerUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/puppeteer';

import inputDriverFactory from '../src/Input/Input.puppeteer.driver';

export const inputTestkitFactory = puppeteerTestkitFactoryCreator(
  inputDriverFactory,
);

import formFieldDriverFactory from '../src/FormField/FormField.puppeteer.driver';

export const formFieldTestkitFactory = puppeteerTestkitFactoryCreator(
  formFieldDriverFactory,
);

import tableDriverFactory from '../src/Table/Table.puppeteer.driver';

export const tableTestkitFactory = puppeteerTestkitFactoryCreator(
  tableDriverFactory,
);

import headingDriverFactory from '../src/Heading/Heading.puppeteer.driver';

export const headingTestkitFactory = puppeteerTestkitFactoryCreator(
  headingDriverFactory,
);

import textDriverFactory from '../src/Text/Text.puppeteer.driver';

export const textTestkitFactory = puppeteerTestkitFactoryCreator(
  textDriverFactory,
);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.puppeteer.driver';

export const tooltipTestkitFactory = puppeteerTestkitFactoryCreator(
  tooltipDriverFactory,
);

// wix-ui-core (unidriver)

import { textButtonDriverFactory } from '../src/TextButton/TextButton.driver';

export const textButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  textButtonDriverFactory,
);

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  avatarDriverFactory,
);

import { iconButtonDriverFactory } from '../src/IconButton/IconButton.driver';

export const iconButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  iconButtonDriverFactory,
);

import { closeButtonDriverFactory } from '../src/CloseButton/CloseButton.driver';

export const closeButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  closeButtonDriverFactory,
);

import { proportionDriverFactory } from '../src/Proportion/Proportion.driver';

export const proportionTestkitFactory = puppeteerUniTestkitFactoryCreator(
  proportionDriverFactory,
);

/*
 * Component generator test component
 */
import { generatedTestComponentDriverFactory } from '../src/GeneratedTestComponent/GeneratedTestComponent.uni.driver';

export const generatedTestComponentTestkitFactory = puppeteerUniTestkitFactoryCreator(
  generatedTestComponentDriverFactory,
);

import { dropdownBaseDriverFactory } from '../src/DropdownBase/DropdownBase.driver';

export const dropdownBaseTestkitFactory = puppeteerUniTestkitFactoryCreator(
  dropdownBaseDriverFactory,
);

import { calendarPanelFooterDriverFactory } from '../src/CalendarPanelFooter/CalendarPanelFooter.driver';

export const calendarPanelFooterTestkitFactory = puppeteerUniTestkitFactoryCreator(
  calendarPanelFooterDriverFactory,
);

import { boxDriverFactory } from '../src/Box/Box.driver';

export const boxTestkitFactory = puppeteerUniTestkitFactoryCreator(
  boxDriverFactory,
);

import { buttonDriverFactory } from '../src/Button/Button.driver';

export const buttonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  buttonDriverFactory,
);

import { thumbnailDriverFactory } from '../src/Thumbnail/Thumbnail.driver';

export const thumbnailTestkitFactory = puppeteerUniTestkitFactoryCreator(
  thumbnailDriverFactory,
);

import { segmentedToggleDriverFactory } from '../src/SegmentedToggle/SegmentedToggle.driver';

export const segmentedToggleTestkitFactory = puppeteerUniTestkitFactoryCreator(
  segmentedToggleDriverFactory,
);

import { richTextInputAreaDriverFactory } from '../src/RichTextInputArea/RichTextInputArea.driver';

export const richTextInputAreaTestkitFactory = puppeteerUniTestkitFactoryCreator(
  richTextInputAreaDriverFactory,
);

import { richTextToolbarDriverFactory } from '../src/RichTextInputArea/RichTextToolbar.driver';

export const richTextToolbarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  richTextToolbarDriverFactory,
);

import { floatingNotificationDriverFactory } from '../src/FloatingNotification/FloatingNotification.driver';

export const floatingNotificationTestkitFactory = puppeteerUniTestkitFactoryCreator(
  floatingNotificationDriverFactory,
);

import { numberInputDriverFactory } from '../src/NumberInput/NumberInput.uni.driver';

export const numberInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  numberInputDriverFactory,
);

import { noBorderInputDriverFactory } from '../src/NoBorderInput/NoBorderInput.puppeteer.driver';

export const noBorderInputTestkitFactory = puppeteerTestkitFactoryCreator(
  noBorderInputDriverFactory,
);

import { colorInputDriverFactory } from '../src/ColorInput/ColorInput.driver';

export const colorInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  colorInputDriverFactory,
);
