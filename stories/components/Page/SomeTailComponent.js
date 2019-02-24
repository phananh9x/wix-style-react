import React from 'react';
import Tabs from 'wix-style-react/Tabs';

const SomeTailComponent = () => (
  <Tabs
    activeId={'1'}
    hasDivider={false}
    items={[1, 2, 3].map(i => ({ id: `${i}`, title: `#${i} item` }))}
  />
);

export default SomeTailComponent;
