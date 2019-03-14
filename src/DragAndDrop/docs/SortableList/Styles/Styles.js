import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import Styles from './Styles.md';

export default () => (
  <div>
    <Markdown source={Styles} />
  </div>
);
