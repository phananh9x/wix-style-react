import React from 'react';
import styles from './ExampleBadges.scss';

import Badge, { SIZE, SKIN, TYPE } from 'wix-style-react/Badge';

const skins = Object.keys(SKIN);
const sizes = Object.keys(SIZE);
const sizesString = sizes.join(', ');
const types = Object.keys(TYPE);
const typesString = types.join(', ');

const renderBadge = props => (
  <span className={styles.option}>
    <Badge {...props}>Some Badge</Badge>
  </span>
);

const renderTypes = props => types.map(type => renderBadge({ type, ...props }));
const renderSizes = props => sizes.map(size => renderTypes({ size, ...props }));

export default () => (
  <div data-hook="badge-variations">
    {skins.map(skin => (
      <div key={skin}>
        skin: {skin} | sizes: {sizesString} | types: {typesString} | upppercase:
        true, false
        <div className={styles.wrapper} key={skin}>
          {renderSizes({ skin })}
          {renderBadge({ uppercase: false, skin })}
        </div>
      </div>
    ))}
  </div>
);
