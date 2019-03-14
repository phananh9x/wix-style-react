import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import { Download, Duplicate } from 'wix-style-react/new-icons';

import style from '../TableActionCell.story.st.css';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      dataHook="story-only-visible-secondary"
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
        },
      ]}
      numOfVisibleSecondaryActions={2}
    />
  </div>
);

export default Example;
