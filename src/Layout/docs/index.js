import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import storySettings from './storySettings';

import ListOfCards from './examples/ListOfCards';
import ListOfCardsRaw from '!raw-loader!./examples/ListOfCards';

import MainAndSide from './examples/MainAndSide';
import MainAndSideRaw from '!raw-loader!./examples/MainAndSide';

import Form from './examples/Form';
import FormRaw from '!raw-loader!./examples/Form';

import HolyGrail from './examples/HolyGrail';
import HolyGrailRaw from '!raw-loader!./examples/HolyGrail';

storiesOf(storySettings.examplesCategory, module)
  .add(storySettings.holyGrailLayout, () => (
    <CodeExample title="Holy Grail Layout" code={HolyGrailRaw}>
      <HolyGrail />
    </CodeExample>
  ))

  .add(storySettings.listOfCards, () => (
    <CodeExample title="List of Cards" code={ListOfCardsRaw}>
      <ListOfCards />
    </CodeExample>
  ))

  .add(storySettings.mainAndSide, () => (
    <CodeExample title="Main and Side" code={MainAndSideRaw}>
      <MainAndSide />
    </CodeExample>
  ))

  .add(storySettings.form, () => (
    <CodeExample title=" Form" code={FormRaw}>
      <Form />
    </CodeExample>
  ));
