/*
 * This file exports object with config for component testkits.
 * Ideally there should be no config, it is used for cases that are not following convention.
 *
 * Glossary:
 *   regular components export testkits and pass sanity tests automatically (no config).
 *   non-regular components need additional config for export and sanity tests to be automated.
 *
 * { [component.displayName]: TestkitDefinition }
 *
 * [component.displayName] = {
 *   // what kind of drivers should be tested
 *   drivers?: ['vanilla', 'enzyme']
 *
 *   // set to true if testkit already has export in `test/generate-testkit-exports/enzyme.template
 *   // this is used for proxied components from other libraries (like wix-ui-backoffice)
 *   manualExport?: false;
 *
 *   // skip sanity tests for this component entirely.
 *   // this is likely an indication for a fix
 *   skipTestkitSanity?: false;
 *
 *   // Indicate that component does not have testkit at all.
 *   // It is sometimes ok not to have one.
 *   noTestkit?: false;
 *
 *   // Mark if component uses unidriver.
 *   // It is required for unidriver, because it is tested differently
 *   unidriver?: false;
 *
 *   // set path to testkit if path is not following convention
 *   // this file will be imported and wrapped with appropriate testkit factory
 *   // (one of testkitFactoryCreator, uniTestkitFactoryCreator, enzymeTestkitFactoryCreator or enzymeUniTestkitFactoryCreator
 *   testkitPath?: function;
 * }
 */

module.exports = {
  SideMenuDrill: {
    skipSanityTest: true,
    testkitPath: '../src/SideMenu/DrillView/DrillView.driver',
  },

  BadgeSelectItemBuilder: { skipSanityTest: true, noTestkit: true },

  MultiSelect: {
    skipSanityTest: true, // testkit does not have root `exists` method
  },

  MultiSelectCheckbox: {
    skipSanityTest: true, // testkit does not have root `exists` method
  },

  DragAndDrop: { skipSanityTest: true, noTestkit: true },
  DragDropContextProvider: { skipSanityTest: true, noTestkit: true },

  EndorseContentLayout: {
    skipSanityTest: true,
    // TODO: testkit of this component is not following convention.
    // It is used only internally and before automated export was not exported manually
    noTestkit: true,
  },

  GoogleAddressInput: {
    skipSanityTest: true,
    // TODO: testkit of this component is not following convention.
    // It is used only internally and before automated export was not exported manually
    noTestkit: true,
  },

  Grid: { skipSanityTest: true, noTestkit: true },
  HBox: { skipSanityTest: true, noTestkit: true },
  Layout: { skipSanityTest: true, noTestkit: true },
  MessageBox: { skipSanityTest: true, noTestkit: true },

  Header: {
    testkitPath: '../src/Card/Header/Header.driver',
    // TODO: this is actually  Card.Header, but is exported just as header
    skipSanityTest: true,
  },

  Page: { skipSanityTest: true },
  PageHeader: { skipSanityTest: true },
  PopoverMenuItem: { skipSanityTest: true, noTestkit: true },
  TableToolbar: { skipSanityTest: true, noTestkit: true },
  Tooltip: { skipSanityTest: true },
  VBox: { skipSanityTest: true, noTestkit: true },
  Collapse: { skipSanityTest: true, noTestkit: true },
  Card: { skipSanityTest: true, noTestkit: true },
  Composite: { skipSanityTest: true, noTestkit: true },
  FullTextView: { skipSanityTest: true, noTestkit: true },

  RichTextArea: {
    beforeAllHook: () => (window.getSelection = () => ({})),
  },

  Avatar: { unidriver: true },

  TextButton: {
    unidriver: true,
  },

  IconButton: {
    unidriver: true,
    skipSanityTest: true,
  },

  CloseButton: {
    unidriver: true,
  },

  CardGalleryItem: {
    unidriver: true,
  },

  SideMenu: {
    testkitPath: '../src/SideMenu/core/SideMenu.driver',
  },

  Button: { unidriver: true },

  CalendarPanelFooter: {
    unidriver: true,
  },

  ContactItemBuilder: { skipSanityTest: true },

  Draggable: {
    testkitPath: '../src/DragAndDrop/Draggable/Draggable.driver',
    skipSanityTest: true,
  },

  EditableRow: {
    testkitPath: '../src/EditableSelector/EditableRow/EditableRow.driver',
    skipSanityTest: true,
  },

  FieldLabelAttributes: {
    testkitPath: '../src/FieldLabelAttributes/FieldLabelAttributes.driver',
    skipSanityTest: true,
  },

  FieldWithSelectionComposite: {
    testkitPath:
      '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver',
    skipSanityTest: true,
  },

  Carousel: {
    drivers: ['enzyme'],
  },

  Notification: {},

  FloatingNotification: { unidriver: true, drivers: ['enzyme'] },

  DatePicker: {
    skipSanityTest: true, // testkit does not have root `exists` method
  },

  Proportion: { unidriver: true, drivers: ['enzyme'] },
  GeneratedTestComponent: { unidriver: true, drivers: ['enzyme'] },
  DropdownBase: { unidriver: true },

  RadioButton: {
    testkitPath: '../src/RadioGroup/RadioButton/RadioButton.driver',
    skipSanityTest: true,
  },

  MessageBoxMarketerialLayout: {
    testkitPath: '../src/MessageBox/MessageBoxMarketerialLayout.driver',
    skipSanityTest: true,
  },

  MessageBoxFunctionalLayout: {
    testkitPath: '../src/MessageBox/MessageBoxFunctionalLayout.driver',
    skipSanityTest: true,
  },

  Box: { unidriver: true },
  Thumbnail: { unidriver: true },

  SegmentedToggle: {
    testkitPath: '../src/SegmentedToggle/SegmentedToggle.driver',
    unidriver: true,
  },

  RichTextInputArea: { unidriver: true },

  NoBorderInput: {},
};
