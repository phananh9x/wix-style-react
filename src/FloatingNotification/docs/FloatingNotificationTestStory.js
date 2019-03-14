import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';

import { storySettings } from './storySettings';
import { StatusComplete } from '../../new-icons';

import FloatingNotification from '..';
import { NOTIFICATION_TYPES } from '../constants';

const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});

const LONG_TEXT = 'all work and no play makes jack a dull boy '.repeat(2);

function renderTestCase(desc, props) {
  const defaultProps = {
    text: 'Some content text',
  };
  return (
    <div style={{ margin: '10px' }}>
      <div>{desc}:</div>
      <FloatingNotification {...defaultProps} {...props} />
    </div>
  );
}

storiesOf(kind, module).add(storySettings.testStories.ALL, () => {
  return (
    <RTLWrapper>
      <div style={{ display: 'flex' }}>
        <div>
          {renderTestCase('with defaults', {})}
          {renderTestCase('with prefix icon', {
            prefixIcon: <StatusComplete />,
          })}
          {Object.values(NOTIFICATION_TYPES).forEach(type => {
            renderTestCase(`with type=${type}`, { type: type });
          })}

          {renderTestCase('with textButton', {
            textButtonProps: { label: 'Trash' },
          })}
          {renderTestCase('with button', { buttonProps: { label: 'Undo' } })}
          {renderTestCase('with textButton and button', {
            textButtonProps: { label: 'Trash' },
            buttonProps: { label: 'Undo' },
          })}
          {renderTestCase('with short text and 1 button with long text', {
            buttonProps: { label: LONG_TEXT },
          })}
        </div>
        <div>
          {renderTestCase('with long text', { text: LONG_TEXT })}
          {renderTestCase('with long text and buttons', {
            text: LONG_TEXT,
            textButtonProps: { label: 'Trash' },
            buttonProps: { label: 'Undo' },
          })}
          {renderTestCase('with long text and no close button', {
            text: LONG_TEXT,
            showCloseButton: false,
          })}
          {renderTestCase('with long text and buttons with long text', {
            text: LONG_TEXT,
            buttonProps: { label: LONG_TEXT },
            textButtonProps: { label: LONG_TEXT },
          })}
          <div style={{ height: '100px' }} />
          {renderTestCase('with long text and 1 button with long text', {
            text: LONG_TEXT,
            buttonProps: { label: LONG_TEXT },
          })}
        </div>
      </div>
    </RTLWrapper>
  );
});
