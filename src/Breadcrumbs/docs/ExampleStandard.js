import React from 'react';
import styles from './ExampleBreadcrumbs.scss';
import Breadcrumbs from '..';

const items = [
  { id: '1', value: 'first item' },
  { id: '2', value: 'second item' },
  { id: '3', value: 'third item' },
];
const itemsWithLinks = [
  { id: '1', value: 'Wix', link: 'http://www.wix.com' },
  {
    id: '2',
    value: 'Google',
    customElement: (
      <a
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        href="http://www.google.com"
      >
        Google
      </a>
    ),
  },
  { id: '3', value: 'Yahoo', link: 'http://www.yahoo.com' },
];

export default () => (
  <div>
    <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>
      Without links
      <Breadcrumbs dataHook="story-breadcrumbs-no-links" items={items} />
    </div>
    <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>
      With links
      <Breadcrumbs
        dataHook="story-breadcrumbs-with-links"
        items={itemsWithLinks}
      />
    </div>
  </div>
);
