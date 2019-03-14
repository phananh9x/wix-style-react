import React from 'react';
import * as icons from 'wix-ui-icons-common';

import Avatar from '..';
import { storySettings } from './storySettings';
import styles from './AvatarStory.scss';

import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import { Layout, Cell } from '../../Layout';

const IMG_REAL_URL = 'https://randomuser.me/api/portraits/women/39.jpg';
const IMG_INVALID_URL = 'https://1234.me/4321.jpg';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Avatar,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    name: 'John Doe',
    placeholder: undefined,
    imgProps: undefined,
    size: undefined,
    color: undefined,
    text: undefined,
    title: 'Wix Account: John Doe (johndoe@gmail.com)',
    ariaLabel: 'Avatar for John Doe',
  },
  exampleProps: {
    size: [
      'size90',
      'size72',
      'size60',
      'size48',
      'size36',
      'size30',
      'size24',
      'size18',
    ],
    color: ['blue', 'green', 'grey', 'red', 'orange'],
    imgProps: [
      { label: 'With Image', value: { src: IMG_REAL_URL } },
      { label: 'With Invalid Image URL', value: { src: IMG_INVALID_URL } },
    ],
    placeholder: Object.entries(icons).map(([name, icon]) => ({
      label: name,
      value: React.createElement(icon),
    })),
  },
  examples: (
    <Layout>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Image"
          initialCode={`
<Avatar 
  imgProps={{src: 'https://randomuser.me/api/portraits/women/39.jpg'}}
/>`}
        />
      </Cell>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Image Error (Icon Placeholder)"
          initialCode={`
<Avatar 
  imgProps={{src: 'https://1234.me/4321.jpg'}}
/>`}
        />
      </Cell>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Image Error (Initials Placeholder)"
          initialCode={`
<Avatar 
  name="John Doe"
  imgProps={{src: 'https://1234.me/4321.jpg'}}
/>`}
        />
      </Cell>
      <Cell>
        <LiveCodeExample
          compact
          scope={{ styles }}
          title="Sizes"
          initialCode={`
<div className={styles.container}>
  <Avatar size="size90" name={'John Doe'} />
  <Avatar size="size72" name={'John Doe'} />
  <Avatar size="size60" name={'John Doe'} />
  <Avatar size="size48" name={'John Doe'} />
  <Avatar size="size36" name={'John Doe'} />
  <Avatar size="size30" name={'John Doe'} />
  <Avatar size="size24" name={'John Doe'} />
  <Avatar size="size18" name={'John Doe'} />
</div>  
  `}
        />
      </Cell>
      <Cell>
        <LiveCodeExample
          compact
          scope={{ styles }}
          title="Colors"
          initialCode={`
<div className={styles.container}>
  <Avatar color="blue"   name={'John Doe'} />
  <Avatar color="green"  name={'John Doe'} />
  <Avatar color="grey"   name={'John Doe'} />
  <Avatar color="red"    name={'John Doe'} />
  <Avatar color="orange" name={'John Doe'} />  
</div>  
  `}
        />
      </Cell>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Placeholder (No name)"
          initialCode={`<Avatar />`}
        />
      </Cell>

      <Cell>
        <LiveCodeExample
          compact
          title="Custom text"
          initialCode={`<Avatar name="John H. Doe" text="JhD"/>`}
        />
      </Cell>
    </Layout>
  ),
};
