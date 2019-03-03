import React from 'react';
import {
  description as baseDescription,
  table,
} from 'wix-storybook-utils/Sections';
import { halfWidth, importExample } from '../sections';

import LinkTo from '@storybook/addon-links/react';
import styles from './styles.scss';

export default ({
  description,
  includedComponents,
  importExample: importExampleSource,
}) => {
  return [
    halfWidth(baseDescription({ title: 'Description', text: description })),
    halfWidth(
      table({
        title: 'Included Components',
        rows: includedComponents.map(component => {
          return [
            <LinkTo kind="Components" story={component.name}>{`<${
              component.name
            } />`}</LinkTo>,
            component.description,
          ];
        }),
      }),
    ),
    importExample(importExampleSource),
    baseDescription({ text: <div className={styles.divider} /> }),
  ];
};
