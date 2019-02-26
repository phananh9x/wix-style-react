import 'regenerator-runtime/runtime';
import {
  protractorTestkitFactoryCreator,
  protractorUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';

// here for historical reasons, should probably deprecate it
export {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import inputDriverFactory from '../src/Input/Input.protractor.driver';

export const inputTestkitFactory = protractorTestkitFactoryCreator(
  inputDriverFactory,
);

import addItemDriverFactory from '../src/AddItem/AddItem.protractor.driver';

export const addItemTestkitFactory = protractorTestkitFactoryCreator(
  addItemDriverFactory,
);

import richTextAreaDriverFactory from '../src/RichTextArea/RichTextArea.protractor.driver';

export const richTextAreaTestkitFactory = protractorTestkitFactoryCreator(
  richTextAreaDriverFactory,
);

import inputAreaDriverFactory from '../src/InputArea/InputArea.protractor.driver';

export const inputAreaTestkitFactory = protractorTestkitFactoryCreator(
  inputAreaDriverFactory,
);

import pageDriverFactory from '../src/Page/Page.protractor.driver';

export const pageTestkitFactory = protractorTestkitFactoryCreator(
  pageDriverFactory,
);

import pageHeaderDriverFactory from '../src/PageHeader/PageHeader.protractor.driver';

export const pageHeaderTestkitFactory = protractorTestkitFactoryCreator(
  pageHeaderDriverFactory,
);

import popoverDriverFactory from '../src/Popover/Popover.protractor.driver';

export const popoverTestkitFactory = protractorTestkitFactoryCreator(
  popoverDriverFactory,
);

import dataTableDriverFactory from '../src/DataTable/DataTable.protractor.driver';

export const dataTableTestkitFactory = protractorTestkitFactoryCreator(
  dataTableDriverFactory,
);

import tableDriverFactory from '../src/Table/Table.protractor.driver';

export const tableTestkitFactory = protractorTestkitFactoryCreator(
  tableDriverFactory,
);

import tableActionCellDriverFactory from '../src/TableActionCell/TableActionCell.protractor.driver';

export const tableActionCellTestkitFactory = protractorTestkitFactoryCreator(
  tableActionCellDriverFactory,
);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.protractor.driver';

export const breadcrumbsTestkitFactory = protractorTestkitFactoryCreator(
  breadcrumbsDriverFactory,
);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.protractor.driver';

export const autoCompleteTestkitFactory = protractorTestkitFactoryCreator(
  autoCompleteDriverFactory,
);

import checkboxDriverFactory from '../src/Checkbox/Checkbox.protractor.driver';

export const checkboxTestkitFactory = protractorTestkitFactoryCreator(
  checkboxDriverFactory,
);

import dropdownDriverFactory from '../src/Dropdown/Dropdown.protractor.driver';

export const dropdownTestkitFactory = protractorTestkitFactoryCreator(
  dropdownDriverFactory,
);
import dropdownLayoutDriverFactory from '../src/DropdownLayout/DropdownLayout.protractor.driver';

export const dropdownLayoutTestkitFactory = protractorTestkitFactoryCreator(
  dropdownLayoutDriverFactory,
);

import filePickerDriverFactory from '../src/FilePicker/FilePicker.protractor.driver';

export const filePickerTestkitFactory = protractorTestkitFactoryCreator(
  filePickerDriverFactory,
);

import radioGroupDriverFactory from '../src/RadioGroup/RadioGroup.protractor.driver';

export const radioGroupTestkitFactory = protractorTestkitFactoryCreator(
  radioGroupDriverFactory,
);

import multiSelectCompositeDriverFactory from '../src/MultiSelectComposite/MultiSelectComposite.protractor.driver';

export const multiSelectCompositeTestkitFactory = protractorTestkitFactoryCreator(
  multiSelectCompositeDriverFactory,
);

import autoCompleteCompositeDriverFactory from '../src/AutoCompleteComposite/AutoCompleteComposite.protractor.driver';

export const autoCompleteCompositeTestkitFactory = protractorTestkitFactoryCreator(
  autoCompleteCompositeDriverFactory,
);

import rangeDriverFactory from '../src/Range/Range.protractor.driver';

export const rangeTestkitFactory = protractorTestkitFactoryCreator(
  rangeDriverFactory,
);

import fieldWithSelectionCompositeDriverFactory from '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.protractor.driver';

export const fieldWithSelectionCompositeTestkitFactory = protractorTestkitFactoryCreator(
  fieldWithSelectionCompositeDriverFactory,
);

import googleAddressWithInputDriverFactory from '../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.protractor.driver';

export const googleAddressWithInputTestkitFactory = protractorTestkitFactoryCreator(
  googleAddressWithInputDriverFactory,
);

import imageViewerDriverFactory from '../src/ImageViewer/ImageViewer.protractor.driver';

export const imageViewerTestkitFactory = protractorTestkitFactoryCreator(
  imageViewerDriverFactory,
);

import popoverMenuDriverFactory from '../src/PopoverMenu/PopoverMenu.protractor.driver';

export const popoverMenuTestkitFactory = protractorTestkitFactoryCreator(
  popoverMenuDriverFactory,
);

import multiSelectDriverFactory from '../src/MultiSelect/MultiSelect.protractor.driver';

export const multiSelectTestkitFactory = protractorTestkitFactoryCreator(
  multiSelectDriverFactory,
);

import multiSelectCheckboxDriverFactory from '../src/MultiSelectCheckbox/MultiSelectCheckbox.protractor.driver';

export const multiSelectCheckboxTestkitFactory = protractorTestkitFactoryCreator(
  multiSelectCheckboxDriverFactory,
);

import calendarDriverFactory from '../src/Calendar/Calendar.protractor.driver';

export const calendarTestkitFactory = protractorTestkitFactoryCreator(
  calendarDriverFactory,
);

import datePickerDriverFactory from '../src/DatePicker/DatePicker.protractor.driver';

export const datePickerTestkitFactory = protractorTestkitFactoryCreator(
  datePickerDriverFactory,
);

import editableSelectorDriverFactory from '../src/EditableSelector/EditableSelector.protractor.driver';

export const editableSelectorTestkitFactory = protractorTestkitFactoryCreator(
  editableSelectorDriverFactory,
);

import searchDriverFactory from '../src/Search/Search.protractor.driver';

export const searchTestkitFactory = protractorTestkitFactoryCreator(
  searchDriverFactory,
);

import highlighterDriverFactory from '../src/Highlighter/Highlighter.protractor.driver';

export const highlighterTestkitFactory = protractorTestkitFactoryCreator(
  highlighterDriverFactory,
);

import statsWidgetDriverFactory from '../src/StatsWidget/StatsWidget.protractor.driver';

export const statsWidgetTestkitFactory = protractorTestkitFactoryCreator(
  statsWidgetDriverFactory,
);

import loaderDriverFactory from '../src/Loader/Loader.protractor.driver';

export const loaderTestkitFactory = protractorTestkitFactoryCreator(
  loaderDriverFactory,
);

import modalSelectorLayoutDriverFactory from '../src/ModalSelectorLayout/ModalSelectorLayout.protractor.driver';

export const modalSelectorLayoutTestkitFactory = protractorTestkitFactoryCreator(
  modalSelectorLayoutDriverFactory,
);

import sliderDriverFactory from '../src/Slider/Slider.protractor.driver';

export const sliderTestkitFactory = protractorTestkitFactoryCreator(
  sliderDriverFactory,
);

import tabsDriverFactory from '../src/Tabs/Tabs.protractor.driver';

export const tabsTestkitFactory = protractorTestkitFactoryCreator(
  tabsDriverFactory,
);

import drillViewDriverFactory from '../src/SideMenu/DrillView/DrillView.protractor.driver';

export const drillViewTestkitFactory = protractorTestkitFactoryCreator(
  drillViewDriverFactory,
);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.protractor.driver';

export const tooltipTestkitFactory = protractorTestkitFactoryCreator(
  tooltipDriverFactory,
);

import formFieldDriverFactory from '../src/FormField/FormField.protractor.driver';

export const formFieldTestkitFactory = protractorTestkitFactoryCreator(
  formFieldDriverFactory,
);

import emptyStateDriverFactory from '../src/EmptyState/EmptyState.protractor.driver';

export const emptyStateTestkitFactory = protractorTestkitFactoryCreator(
  emptyStateDriverFactory,
);

import textDriverFactory from '../src/Text/Text.protractor.driver';

export const textTestkitFactory = protractorTestkitFactoryCreator(
  textDriverFactory,
);

import messageBoxFunctionalLayoutDriverFactory from '../src/MessageBox/MessageBoxFunctionalLayout.protractor.driver';

export const messageBoxFunctionalLayoutTestkitFactory = protractorTestkitFactoryCreator(
  messageBoxFunctionalLayoutDriverFactory,
);

import headingDriverFactory from '../src/Heading/Heading.protractor.driver';

export const headingTestkitFactory = protractorTestkitFactoryCreator(
  headingDriverFactory,
);

import sectionHelperDriverFactory from '../src/SectionHelper/SectionHelper.protractor.driver';

export const sectionHelperTestkitFactory = protractorTestkitFactoryCreator(
  sectionHelperDriverFactory,
);

import tagDriverFactory from '../src/Tag/Tag.protractor.driver';

export const tagTestkitFactory = protractorTestkitFactoryCreator(
  tagDriverFactory,
);

import badgeSelectDriverFactory from '../src/BadgeSelect/BadgeSelect.protractor.driver';

export const badgeSelectTestkitFactory = protractorTestkitFactoryCreator(
  badgeSelectDriverFactory,
);

import calendarPanelDriverFactory from '../src/CalendarPanel/CalendarPanel.protractor.driver';

export const calendarPanelTestkitFactory = protractorTestkitFactoryCreator(
  calendarPanelDriverFactory,
);

import { calendarPanelFooterDriverFactory } from '../src/CalendarPanelFooter/CalendarPanelFooter.driver';

export const calendarPanelFooterTestkitFactory = protractorUniTestkitFactoryCreator(
  calendarPanelFooterDriverFactory,
);

import genericModalLayoutDriverFactory from '../src/GenericModalLayout/GenericModalLayout.protractor.driver';

export const genericModalLayoutTestkitFactory = protractorTestkitFactoryCreator(
  genericModalLayoutDriverFactory,
);

import carouselDriverFactory from '../src/Carousel/Carousel.protractor.driver';

export const carouselTestkitFactory = protractorTestkitFactoryCreator(
  carouselDriverFactory,
);

import { proportionDriverFactory } from '../src/Proportion/Proportion.driver';

export const proportionTestkitFactory = protractorUniTestkitFactoryCreator(
  proportionDriverFactory,
);

// wix-ui-backoffice proxy

export {
  badgeTestkitFactory,
  stylableCounterBadgeTestkitFactory as counterBadgeTestkitFactory,
  toggleSwitchTestkitFactory,
  labelTestkitFactory,
  floatingHelperTestkitFactory,
  linearProgressBarTestkitFactory,
  circularProgressBarTestkitFactory,
} from 'wix-ui-backoffice/dist/src/testkit/protractor';

// wix-ui-core (unidriver)

import { textButtonDriverFactory } from '../src/TextButton/TextButton.driver';

export const textButtonTestkitFactory = protractorUniTestkitFactoryCreator(
  textButtonDriverFactory,
);

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = protractorUniTestkitFactoryCreator(
  avatarDriverFactory,
);

import cardGalleryItemDriverFactory from '../src/CardGalleryItem/CardGalleryItem.driver';

export const cardGalleryItemTestkitFactory = protractorUniTestkitFactoryCreator(
  cardGalleryItemDriverFactory,
);

import { iconButtonDriverFactory } from '../src/IconButton/IconButton.driver';

export const iconButtonTestkitFactory = protractorUniTestkitFactoryCreator(
  iconButtonDriverFactory,
);

import { closeButtonDriverFactory } from '../src/CloseButton/CloseButton.driver';

export const closeButtonTestkitFactory = protractorUniTestkitFactoryCreator(
  closeButtonDriverFactory,
);

import colorPickerDriverFactory from '../src/ColorPicker/ColorPicker.protractor.driver';

export const colorPickerTestkitFactory = protractorTestkitFactoryCreator(
  colorPickerDriverFactory,
);

/*
 * Component generator test component
 */
import { generatedTestComponentDriverFactory } from '../src/GeneratedTestComponent/GeneratedTestComponent.driver';

export const generatedTestComponentTestkitFactory = protractorUniTestkitFactoryCreator(
  generatedTestComponentDriverFactory,
);

import { dropdownBaseDriverFactory } from '../src/DropdownBase/DropdownBase.driver';

export const dropdownBaseTestkitFactory = protractorUniTestkitFactoryCreator(
  dropdownBaseDriverFactory,
);

import { boxDriverFactory } from '../src/Box/Box.driver';

export const boxTestkitFactory = protractorUniTestkitFactoryCreator(
  boxDriverFactory,
);

import { buttonDriverFactory } from '../src/Button/Button.driver';

export const buttonTestkitFactory = protractorUniTestkitFactoryCreator(
  buttonDriverFactory,
);

import { thumbnailDriverFactory } from '../src/Thumbnail/Thumbnail.driver';

export const thumbnailTestkitFactory = protractorUniTestkitFactoryCreator(
  thumbnailDriverFactory,
);
import { segmentedToggleDriverFactory } from '../src/SegmentedToggle/SegmentedToggle.driver';

export const segmentedToggleTestkitFactory = protractorUniTestkitFactoryCreator(
  segmentedToggleDriverFactory,
);

import { richTextInputAreaDriverFactory } from '../src/RichTextInputArea/RichTextInputArea.driver';

export const richTextInputAreaTestkitFactory = protractorUniTestkitFactoryCreator(
  richTextInputAreaDriverFactory,
);

import { floatingNotificationDriverFactory } from '../src/FloatingNotification/FloatingNotification.driver';

export const floatingNotificationTestkitFactory = protractorUniTestkitFactoryCreator(
  floatingNotificationDriverFactory,
);

import { noBorderInputDriverFactory } from '../src/NoBorderInput/NoBorderInput.protractor.driver';

export const noBorderInputTestkitFactory = protractorTestkitFactoryCreator(
  noBorderInputDriverFactory,
);
