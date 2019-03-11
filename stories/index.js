/**
 * Storybook list of stories
 *
 * order is reflected in storybook sidebar
 */

require('./Introduction');
require('./Playground/Playground');

// 1. Foundations
require('../src/Typography/docs/TypographyStory.js'); // 1.2 Typography
require('../src/Label/docs/index.story.js'); // 1.2 + Label
require('../src/new-icons/docs'); // 1.4 Icons

require('../src/Loader/docs/index.story.js'); // 1.5 Loader
require('../src/LinearProgressBar/docs/index.story.js'); // 1.6 LinearProgressBar
require('../src/CircularProgressBar/docs/index.story.js'); // 1.7 LinearProgressBar
require('./ScrollBar'); // 1.8 ScrollBar

// 2. Layout
require('./PageLayout/index.story'); // 2.1 Page Layout
require('../src/Card/docs'); // 2.2 Card Layout
require('../src/EmptyState/docs/index.story'); // 2.4 EmptyState
require('../src/StatsWidget/docs/index.story'); // 2.7 StatsWidget
require('../src/AddItem/docs/index.story'); // 2.8 AddItem

// 3. Inputs
require('./TextInput/index.story'); // 3.1. Text Input
require('./TextArea/index.story'); // 3.2 Text Area
require('../src/RichTextArea/docs/index.story.js'); // 3.2b + RichTextArea
require('./FieldWithSelectionComposite'); // 3.3 Field With Selection
require('../src/TimeInput/docs/index.story.js'); // 3.4 TimeInput
require('../src/DatePicker/docs/index.story.js'); // 3.6 DatePicker
require('../src/Range/docs'); // 3.7 Range
require('../src/MultiSelect/docs/index.story'); // 3.8 Tags
require('../src/MultiSelectComposite/docs'); // 3.8 + MultiSelectComposite
require('../src/Search/docs/index.story'); // 3.9 Search
require('../src/ImageViewer/docs/index.story'); // 3.10 ImageViewer
require('../src/FilePicker/docs/index.story'); // 3.10 + FilePicker

// 4. Selection
require('../src/Dropdown/docs/DropdownStory.js'); // 4.1 Dropdown
require('../src/AutoComplete/docs'); // 4.1 + AutoComplete
require('../src/AutoCompleteComposite/docs'); // 4.1 + AutoCompleteComposite
require('../src/InputWithOptions/docs'); // 4.1 + InputWithOptions
require('../src/MultiSelectCheckbox/docs/index.story.js'); // 4.1 + MultiSelectCheckbox
require('../src/Checkbox/docs/index.story.js'); // 4.2 Checkbox
require('../src/RadioGroup/docs/index.story.js'); // 4.3 RadioGroup
require('../src/ToggleSwitch/docs/index.story'); // 4.4 ToggleSwitch
require('../src/SegmentedToggle/docs/index.story'); // 4.5 SegmentedToggle
require('../src/Slider/docs/index.story'); // 4.7 Slider
require('../src/ColorInput/docs/index.story'); // 4.8 ColorInput

// 5. Buttons
require('../src/Button/docs/index.story.js'); // 5.1 Standard
require('../src/IconButton/docs/index.story'); // 5.2 Icon Button
require('../src/TextButton/docs/index.story'); // 5.3 Text Button
require('../src/CloseButton/docs/index.story.js'); // 5.4 Close Button

// 6. Navigation
require('../src/SideMenu/docs'); // 6.1 SideMenu
require('../src/Breadcrumbs/docs/index.story.js'); // 6.2 + Breadcrumbs
require('../src/Tabs/docs'); // 6.3 Tabs

// 7. Tooltips
require('../src/Tooltip/docs/Composite/CompositeStory'); // 7.1 Tooltip
require('../src/Popover/docs/index.story'); //7.2 Popover
require('../src/PopoverMenu/docs/index.story'); // 7.3 Popover Menu

// 8. Notification Bars
// 8.1 Standard, 8.2 Error, 8.3 Success, 8.4 Warning, 8.5 Premium
require('../src/Notification/docs/index.story.js');
require('../src/FloatingNotification/docs/index.story');
require('../src/FloatingHelper/docs/index.story.js'); // 8.6 FloatingHelper
require('../src/FloatingHelper/FloatingHelperContent/docs/index.story.js'); // 8.6 + FloatingHelper.Content
require('../src/SectionHelper/docs/index.story.js'); // 8.7 SectionHelper

// 9. Modals
require('../src/MessageBox/docs');
require('../src/Modal/docs');
require('../src/EndorseContentLayout/docs');

// 10. Tables
require('../src/DataTable/docs'); // 10.1 DataTable
require('../src/Table/docs/index.story'); // 10.1 Table
require('../src/TableToolbar/docs/ToolbarStory'); // 10.1 Table -> TableToolbar
require('../src/TableActionCell/docs/index.story.js'); // 10.1 Table -> TableActionCell

// 11. Pickers and Selectors
require('../src/DropdownLayout/docs'); // 11.1 DropdownLayout
require('../src/EditableSelector/docs/index.story'); // 11.2 EditableSelector
require('../src/ModalSelectorLayout/docs/index.story.js'); // 11.3 ModalSelectorLayout
require('../src/ColorPicker/docs/index.story.js'); // 11.5 Color Picker
require('../src/Calendar/docs/index.story'); // 11.5 Calendar
require('../src/CalendarPanel/docs/index.story'); // 11.6 CalendarPanel

// 12. Other
require('../src/Badge/docs/index.story'); // 12.1 Badge
require('../src/BadgeSelect/docs/index.story.js'); // 12.2 BadgeSelect
require('../src/CounterBadge/docs/index.story'); //12.3 CounterBadge
require('../src/FullTextView/docs/index.story.js'); //12.4 FullTextView
require('../src/Tag/docs/index.story'); // 12.5 Tag
require('../src/Avatar/docs/index.story'); // 12.6 Avatar
require('../src/Highlighter/docs/index.story.js'); // Highlighter

// Components API
require('../src/Box/docs/index.story.js');
require('../src/CalendarPanelFooter/docs/index.story');
require('../src/CardGalleryItem/docs/index.story');
require('../src/Carousel/docs/index.story.js');
require('../src/Collapse/docs/index.story');
require('./Dropdown/Dropdown.story.js');
require('../src/DropdownBase/docs/index.story');
require('../src/FormField/docs/index.story.js');
require('../src/GenericModalLayout/docs/index.story.js');
require('../src/GoogleAddressInput/docs/index.story.js');
require('../src/Grid/docs');
require('../src/Heading/docs/index.story');
require('../src/Input/docs/index.story');
require('../src/InputArea/docs/index.story.js');
require('../src/Layout/docs/index.story.js');
require('../src/Layout/docs');
require('./MultiSelect/index.story');
require('../src/Page/docs/PageExampleStories.js');
require('../src/Page/docs/index.story.js');
require('../src/PageHeader/docs/index.story.js');
require('../src/Proportion/docs/index.story.js');
require('../src/RichTextArea/docs/api.story');
require('../src/Skeleton/docs/index.story.js');
require('../src/Text/docs/index.story');
require('../src/Thumbnail/docs/index.story');

// Styling
require('../src/Typography/docs/TypographyClassesStory');

// WIP
require('./WIP');
require('../src/DragAndDrop/docs/DragAndDrop.js');
require('../src/BadgeSelectItemBuilder/docs');
require('../src/ContactItemBuilder/docs');

// Tests
require('../src/Typography/docs/TypographyTestStories');
require('../src/Input/docs/InputTestStories');
require('../src/TimeInput/docs/testStory');
require('../src/Page/docs/PageTestStories.js'); // Tests/2. Layout/2.5 + Page/
require('../src/Page/docs/PageTestStoriesDeprecated.js'); // Tests/2. Layout/2.5 + Page/Deprecated
require('../src/PageHeader/docs/PageHeaderTestStories.js'); // Tests/2. Layout/2.5 + PageHeader/
require('../src/Button/docs/testButton'); // Tests/5. Button/5.1 Button
require('../src/IconButton/docs/testStory'); // Tests/5. Button/5.2 IconButton
require('../src/TextButton/docs/testStory'); // Tests/5. Button/5.3 TextButton
require('../src/CloseButton/docs/testStory'); // Tests/5. Button/5.4 CloseButton
require('../src/Calendar/docs/CalendarTestStory'); // Tests/3. Inputs/3.13 Calendar
require('../src/MultiSelect/docs/testStory'); // Tests/3. Inputs/3.8 Tags
require('../src/PopoverMenu/docs/PopoverMenuRegressionTest.js'); // Tests/7.3. Popover Menu/
require('../src/Popover/docs/testStory');
require('../src/TableToolbar/docs/ToolbarTestStory'); // Tests/10. Table
require('../src/Tag/docs/TagTestStory'); // Tests/12. Other/12.5 Tag
require('../src/Avatar/docs/AvatarTestStory'); // Tests/12. Other/12.6 Avatar
require('../src/Box/docs/testStory');
require('../src/Thumbnail/docs/testStory');
require('../src/EditableSelector/docs/testStory');
require('../src/Slider/docs/testStory'); // 4.7 Slider
require('../src/StatsWidget/docs/testStory'); // 2.7 StatsWidget
require('../src/SegmentedToggle/docs/testStory'); // 4.5 SegmentedToggle
require('../src/FloatingNotification/docs/FloatingNotificationTestStory'); // 8.2 FloatingNotification
require('../src/FormField/docs/testStory');
require('../src/RichTextArea/docs/testStory');
require('../src/DropdownLayout/docs/testStory');
require('../src/InputWithOptions/docs/testStory');
require('../src/ColorInput/docs/testStory');

// The generated test component
require('../src/GeneratedTestComponent/docs/index.story');
require('../src/GeneratedTestComponent/test/GeneratedTestComponentStories');

// This import was added by the component generator
require('../src/RichTextInputArea/docs/index.story');

// This import was added by the component generator
require('../src/NoBorderInput/docs/index.story');
