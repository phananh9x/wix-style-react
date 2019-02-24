import React from 'react';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';

export default (
  <Breadcrumbs
    items={[1, 2, 3].map(i => ({ id: `${i}`, value: `#${i} item` }))}
    activeId="3"
    size="medium"
    theme="onGrayBackground"
    onClick={() => {}}
  />
);
