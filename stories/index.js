/**
 * Storybook list of stories
 *
 * order is reflected in storybook sidebar
 */

import './Introduction';
import './Playground/Playground';

// 1. Foundations
import './Typography/TypographyStory.js'; // 1.2 Typography
import './Label.story.js'; // 1.2 + Label
import './NewIcons'; // 1.4 Icons

import './Loader.story.js'; // 1.5 Loader
import './LinearProgressBar.story.js'; // 1.6 LinearProgressBar
import './CircularProgressBar.story.js'; // 1.7 LinearProgressBar
import './ScrollBar'; // 1.8 ScrollBar

// 2. Layout
import './Page/index.story.js'; // 2.5 Page
import './PageHeader/index.story.js'; // 2.5 + PageHeader
import './Page/PageExampleStories.js'; // 2.5 + Page Examples
import './EmptyState/EmptyState.story'; // 2.6 EmptyState
import './StatsWidget/index.story'; // 2.7 StatsWidget
import './AddItem/AddItem.story'; // 2.8 AddItem
import './Grid';
import './Card';

// 3. Inputs
import './TextInput/index.story'; // 3.1. Text Input
import './TextArea/index.story'; // 3.2 Text Area
import './RichTextAreaComposite'; // 3.2b RichTextAreaComposite
import './RichTextArea/RichTextArea.story.js'; // 3.2b + RichTextArea
import './FieldWithSelectionComposite'; // 3.3 Field With Selection
import './TimeInput.story.js'; // 3.4 TimeInput
import './DatePicker.story.js'; // 3.6 DatePicker
import './Range'; // 3.7 Range
import './MultiSelect/index.story'; // 3.8 Tags
import './MultiSelectComposite'; // 3.8 + MultiSelectComposite
import './Search/index.story'; // 3.9 Search
import './ImageViewer/index.story'; // 3.10 ImageViewer
import './FilePicker/index.story'; // 3.10 + FilePicker

// 4. Selection
import './Dropdown/DropdownStory.js'; // 4.1 Dropdown
import './AutoComplete'; // 4.1 + AutoComplete
import './AutoCompleteComposite'; // 4.1 + AutoCompleteComposite
import './InputWithOptions'; // 4.1 + InputWithOptions
import './MultiSelectCheckbox/index.story.js'; // 4.1 + MultiSelectCheckbox
import './CheckBox/index.story.js'; // 4.2 Checkbox
import './RadioGroup.story.js'; // 4.3 RadioGroup
import './ToggleSwitch/index.story'; // 4.4 ToggleSwitch
import './SegmentedToggle/index.story'; // 4.5 SegmentedToggle
import './Slider/index.story'; // 4.7 Slider

// 5. Buttons
import './Button/index.story.js'; // 5.1 Standard
import './IconButton/index.story'; // 5.2 Icon Button
import './TextButton/index.story'; // 5.3 Text Button
import './CloseButton/index.story.js'; // 5.4 Close Button

// 6. Navigation
import './SideMenu'; // 6.1 SideMenu
import './Breadcrumbs/index.story.js'; // 6.2 + Breadcrumbs
import './Tabs'; // 6.3 Tabs

// 7. Tooltips
import './Tooltip/Composite/CompositeStory'; // 7.1 Tooltip
import './Popover/index.story'; //7.2 Popover
import './PopoverMenu/index.story'; // 7.3 Popover Menu

// 8. Notification Bars
// 8.1 Standard, 8.2 Error, 8.3 Success, 8.4 Warning, 8.5 Premium
import './Notification/index.story.js';
import './FloatingNotification/index.story';
import './FloatingHelper/FloatingHelper.story.js'; // 8.6 FloatingHelper
import './FloatingHelperContent/FloatingHelperContent.story.js'; // 8.6 + FloatingHelper.Content
import './SectionHelper/SectionHelper.story.js'; // 8.7 SectionHelper

// 9. Modals
import './MessageBox';
import './Modal';
import './EndorseContentLayout';

// 10. Tables
import './DataTable'; // 10.1 DataTable
import './Table'; // 10.1 Table
import './TableToolbar/ToolbarStory.js'; // 10.1 Table -> TableToolbar
import './TableActionCell/TableActionCell.story'; // 10.1 Table -> TableActionCell

// 11. Pickers and Selectors
import './DropdownLayout'; // 11.1 DropdownLayout
import './EditableSelector/index.story'; // 11.2 EditableSelector
import './ModalSelectorLayout.story.js'; // 11.3 ModalSelectorLayout
import './ColorPicker/index.story.js'; // 11.5 Color Picker
import './Calendar/index.story'; // 11.5 Calendar
import './CalendarPanel/index.story'; // 11.6 CalendarPanel

// 12. Other
import './Badge/index.story'; // 12.1 Badge
import './BadgeSelect/index.story.js'; // 12.2 BadgeSelect
import './CounterBadge/CounterBadge.story'; //12.3 CounterBadge
import './FullTextView.story.js'; //12.4 FullTextView
import './Tag/Tag.story'; // 12.5 Tag
import './Avatar/Avatar.story'; // 12.6 Avatar
import './Highlighter.story.js'; // Highlighter

// Components API
import './Box/index.story.js';
import './components/Calendar/index.story';
import './components/CalendarPanel/index.story';
import './CalendarPanelFooter/index.story';
import './CardGalleryItem/CardGalleryItem.story';
import './Carousel/index.story.js';
import './Collapse.story';
import './components/Dropdown/Dropdown.story.js';
import './DropdownBase/index.story';
import './FormField/index.story.js';
import './GenericModalLayout/GenericModalLayout.story.js';
import './GoogleAddressInput/index.story.js';
import './Heading/index.story';
import './Input/index.story';
import './InputArea/index.story.js';
import './Layout/index.story.js';
import './Layout';
import './components/MultiSelect/index.story';
import './Proportion/index.story.js';
import './Skeleton.story.js';
import './Text/index.story';
import './Thumbnail/index.story';

// Styling
import './Typography/TypographyClassesStory';

// WIP
import './WIP';
import './DragAndDrop/DragAndDrop.js';
import './Builders/BadgeSelectItemBuilder';
import './Builders/ContactItemBuilder';

// Tests
import './Typography/TypographyTestStories';
import './Input/InputTestStories';
import './Page/PageTestStories.js'; // Tests/2. Layout/2.5 + Page/
import './Page/PageTestStoriesDeprecated.js'; // Tests/2. Layout/2.5 + Page/Deprecated
import './PageHeader/PageHeaderTestStories.js'; // Tests/2. Layout/2.5 + PageHeader/
import './Button/testButton'; // Tests/5. Button/5.1 Button
import './IconButton/testStory'; // Tests/5. Button/5.2 IconButton
import './TextButton/testStory'; // Tests/5. Button/5.3 TextButton
import './CloseButton/testStory'; // Tests/5. Button/5.4 CloseButton
import './Calendar/CalendarTestStory'; // Tests/3. Inputs/3.13 Calendar
import './MultiSelect/MultiSelectTestStory'; // Tests/3. Inputs/3.8 Tags
import './PopoverMenu/PopoverMenuRegressionTest.js'; // Tests/7.3. Popover Menu/
import './Popover/testStory';
import './TableToolbar/ToolbarTestStory'; // Tests/10. Table
import './Tag/TagTestStory'; // Tests/12. Other/12.5 Tag
import './Avatar/AvatarTestStory'; // Tests/12. Other/12.6 Avatar
import './Box/testStory';
import './Thumbnail/testStory';
import './EditableSelector/testStory';
import './Slider/testStory'; // 4.7 Slider
import './StatsWidget/testStory'; // 2.7 StatsWidget
import './SegmentedToggle/testStory'; // 4.5 SegmentedToggle
import './FloatingNotification/FloatingNotificationTestStory'; // 8.2 FloatingNotification
import './FormField/testStory';

// The generated test component
import './GeneratedTestComponent/index.story';

// This import was added by the component generator
import './Accordion/index.story';
import './RichTextInputArea/index.story';