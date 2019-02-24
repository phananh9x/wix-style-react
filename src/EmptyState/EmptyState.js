import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EmptyState.scss';

import Heading from '../Heading';
import Text from '../Text';

/**
 * Representing a state of an empty page, section, table, etc.
 */
const EmptyState = ({ theme, title, subtitle, image, children, dataHook }) => (
  <div
    className={classNames(styles.wrapper, styles[theme])}
    data-hook={dataHook}
  >
    <div className={styles.container}>
      {image && (
        <div
          className={styles.imageContainer}
          data-hook="empty-state-image-container"
        >
          {typeof image === 'string' ? (
            <img
              className={styles.imageElement}
              src={image}
              data-hook="image-element"
            />
          ) : (
            React.cloneElement(image, {
              'data-hook': 'image-node',
            })
          )}
        </div>
      )}

      {title && (
        <div
          className={styles.titleContainer}
          data-hook="empty-state-title-container"
        >
          {theme === 'section' ? (
            <Text weight="normal">{title}</Text>
          ) : (
            <Heading appearance="H3">{title}</Heading>
          )}
        </div>
      )}

      <div
        className={styles.subtitleContainer}
        data-hook="empty-state-subtitle-container"
      >
        <Text secondary>{subtitle}</Text>
      </div>

      {children && (
        <div
          className={styles.childrenContainer}
          data-hook="empty-state-children-container"
        >
          {children}
        </div>
      )}
    </div>
  </div>
);

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** The theme of the EmptyState */
  theme: PropTypes.oneOf(['page', 'page-no-border', 'section']),

  /** Content for the title of the Empty State */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Content for the subtitle of the Empty State */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** The Empty State image, can be either a string representing the image URL, or a node to render instead */
  image: PropTypes.node,

  /** Children to render below the subtitle, ideally an action of some type (Button or TextLink for instance) */
  children: PropTypes.node,

  dataHook: PropTypes.string,
};

EmptyState.defaultProps = {
  theme: 'section',
  image: null,
  children: null,
};

export default EmptyState;
