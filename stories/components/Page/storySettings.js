import { Category } from '../../storiesHierarchy';

const PageWithScrollConstants = (function() {
  const pageHeight = 500;
  const pageBottomPadding = 48;
  const headerContainerHeight = 156;
  const minimizedHeaderContainerHeight = 67;
  const scrollTrigger = headerContainerHeight - minimizedHeaderContainerHeight;

  return {
    scrollTrigger,
    minimizedHeaderContainerHeight,
    headerContainerHeight,
    pageBottomPadding,
    pageHeight,
  };
})();

export const storySettings = {
  category: Category.COMPONENTS,
  storyName: 'Page',
  dataHook: 'story-page',
  PageWithScrollConstants,
};
