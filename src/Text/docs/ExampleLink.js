import React from 'react';
import Text from 'wix-style-react/Text';

export default () => (
  <Text dataHook="storybook-text-link">
    Text component applies link styles to anchor elements that are{' '}
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator"
      target="_blank"
      rel="noopener noreferrer"
    >
      direct children
    </a>{' '}
    only
    <br />
    <span>
      <a href="https://www.wix.com" target="_blank" rel="noopener noreferrer">
        Nested anchors
      </a>
    </span>{' '}
    are not styled (what you see is the default browser styles)
  </Text>
);
