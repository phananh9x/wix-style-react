import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import { Duplicate, Print } from 'wix-style-react/new-icons';

import style from '../TableActionCell.story.st.css';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      dataHook="story-always-visible-secondary"
      secondaryActions={[
        {
          text: 'Duplicate',
          icon: <Duplicate />,
          onClick: () => window.alert('Duplicate action was triggered.'),
        },
        {
          text: 'Print',
          icon: <Print />,
          onClick: () => window.alert('Print action was triggered.'),
        },
      ]}
      numOfVisibleSecondaryActions={2}
      alwaysShowSecondaryActions
    />
  </div>
);

export default Example;
