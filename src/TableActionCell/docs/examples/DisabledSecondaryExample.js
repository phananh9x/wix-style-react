import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import { Download, Duplicate, Print } from 'wix-style-react/new-icons';

import style from '../TableActionCell.story.st.css';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      dataHook="story-disabled-secondary"
      secondaryActions={[
        {
          text: 'Download',
          icon: <Download />,
          onClick: () => window.alert('Download action was triggered.'),
        },
        {
          text: 'Duplicate',
          icon: <Duplicate />,
          onClick: () => window.alert('Duplicate action was triggered.'),
          disabled: true,
        },
        {
          text: 'Print',
          icon: <Print />,
          onClick: () => window.alert('Print action was triggered.'),
          disabled: true,
        },
      ]}
      numOfVisibleSecondaryActions={1}
    />
  </div>
);

export default Example;
