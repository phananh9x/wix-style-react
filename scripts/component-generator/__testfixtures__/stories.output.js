/**
 * Storybook list of stories
 *
 * This is a file fixture used to test the sotries.js codemod.
 */

// 1. Foundations
import './Typography/TypographyStory.js'; // 1.2 Typography
import './Label.story.js'; // 1.2 + Label
import './NewIcons'; // 1.4 Icons

// Components API
import './Collapse.story';
import './Counter/index.story';

// Styling
import './Typography/TypographyClassesStory';

// This import was added by the component generator
require('../src/MyNewComponent/docs/index.story');

// This import was added by the component generator
require('../src/MyNewComponent/test/MyNewComponentStories');
