/* eslint-disable no-console */
import React from 'react';

import FilePicker from '..';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: FilePicker,
  componentPath: '..',

  componentProps: {
    mainLabel: 'Choose File',
    subLabel: 'No file chosen (Max size 5 MB)',
  },

  exampleProps: {
    onChange: file => file.name,
  },

  examples: (
    <div style={{ marginBottom: '100px' }}>
      <div style={{ marginBottom: '30px' }}>
        <FilePicker
          dataHook="story-filepicker"
          supportedFormats=".png, .pdf"
          onChange={file => console.log(file.name)}
        />
      </div>

      <FilePicker
        dataHook="story-filepicker2"
        supportedFormats=".png, .pdf"
        onChange={file => console.log(file.name)}
        mainLabel="FilePicker with error"
        error
        errorMessage="File is too large"
      />
    </div>
  ),
};
