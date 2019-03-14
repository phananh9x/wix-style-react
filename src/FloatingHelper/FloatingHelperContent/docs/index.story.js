import * as React from 'react';
import FloatingHelperContent from '..';
import { storySettings } from './StorySettings';
import Image from 'wix-ui-icons-common/Image';

const image = <Image width="102" height="102" />;

const componentProps = {
  title: 'This is the title',
  body: 'This is the a long text which is passed in the `body` propterty',
  actionText: 'Ok, Take Me There!',
  onActionClick: () => null,
};

export default {
  category: storySettings.kind,
  storyName: storySettings.story,
  component: FloatingHelperContent,
  componentPath:
    '../../../../node_modules/wix-ui-backoffice/src/components/FloatingHelper/FloatingHelperContent/FloatingHelperContent.tsx',
  displayName: 'FloatingHelper.Content',
  componentProps,
  exampleProps: {
    onActionClick: () => {
      /** see interactive preview*/
    },
    actionTheme: ['white', 'premium'],
    image: [{ label: 'with image', value: image }],
  },
  exampleImport:
    'import ... - do not import directly, use FloatingHelper.Content',
};
