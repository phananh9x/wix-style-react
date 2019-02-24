import React from 'react';
import {
  description as baseDescription,
  table,
  importExample as baseImportExample,
  columns,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import styles from './styles.scss';

export default ({ description, includedComponents, importExample }) => {
  return [
    columns({
      items: [
        baseDescription({ title: 'Description', text: description }),
        baseDescription(),
      ],
    }),
    columns({
      items: [
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
        baseDescription(),
      ],
    }),
    baseImportExample({
      title: 'Import',
      source: importExample,
    }),
    baseDescription({ text: <div className={styles.divider} /> }),
  ];
};
