import React from 'react';

import PageHeader from '..';
import Button from 'wix-style-react/Button';

import Breadcrumbs from '../../Page/docs/Breadcrumbs';
import './PageHeader.scss';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: PageHeader,
  componentPath: '../PageHeader.js',

  componentProps: {
    onBackClicked: () => {},
    title: 'Page Header',
    dataHook: 'story-page-header',
  },

  exampleProps: {
    breadcrumbs: [{ label: 'Breadcrumbs', value: Breadcrumbs }],
    actionsBar: [
      { label: 'Button', value: <Button>Action</Button> },
      {
        label: 'Two buttons',
        value: (
          <div>
            <Button>Button #1</Button>
            <Button>Button #2</Button>
          </div>
        ),
      },
    ],
  },
};
