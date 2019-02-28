import React from 'react';
import styles from './AccordionItem.scss';
import { Animator } from 'wix-animations';
import Text from '../../Text';
import MoreLessButton from '../MoreLessButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BUTTON_TYPES } from '../constants';

class AccordionItem extends React.PureComponent {
  static displayName = 'AccordionItem';

  static propTypes = {
    dataHook: PropTypes.string,
    buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
    id: PropTypes.number,
    title: PropTypes.string,
    expandLabel: PropTypes.string,
    collapseLabel: PropTypes.string,
    content: PropTypes.node,
    icon: PropTypes.node,
    isOpen: PropTypes.bool,
    toggleOpenClose: PropTypes.func,
    toggleOpen: PropTypes.func,
  };

  state = {
    hover: false,
  };

  toggleHoverOut = () => {
    this.setState({ hover: false });
  };
  toggleHoverIn = () => {
    this.setState({ hover: true });
  };

  render() {
    const { hover } = this.state;
    const {
      dataHook,
      buttonType,
      icon,
      title,
      toggleOpenClose,
      expandLabel,
      collapseLabel,
      isOpen,
      content,
      toggleOpen,
      id,
    } = this.props;
    const itemStyle = classNames(styles.item, {
      [styles.itemNoIcon]: !icon,
      [styles.open]: isOpen,
    });
    const headerTextStyle = classNames(styles.headerText, {
      [styles.headerTextNoIcon]: !icon,
    });
    return (
      <div
        className={styles.wrapper}
        data-hook={dataHook}
        onMouseEnter={this.toggleHoverIn}
        onMouseLeave={this.toggleHoverOut}
        onClick={() => toggleOpen(id)}
      >
        <div className={itemStyle}>
          <div className={styles.headerDetails}>
            <div className={styles.headerDetailsInternal}>
              {icon && (
                <div className={styles.headerIcon} data-hook="icon">
                  {icon}
                </div>
              )}
              {title && (
                <div data-hook="title-container" className={headerTextStyle}>
                  {typeof title === 'string' && (
                    <Text data-hook="title" ellipsis weight="normal">
                      {title}
                    </Text>
                  )}
                  {typeof title === 'object' && title}
                </div>
              )}
            </div>
            <div className={styles.moreLessButton}>
              <MoreLessButton
                dataHook="toggle-accordion-wrapper"
                isOpen={isOpen}
                handleClick={() => toggleOpenClose(id)}
                expandLabel={expandLabel}
                collapseLabel={collapseLabel}
                hover={hover}
                buttonType={buttonType}
              />
            </div>
          </div>
        </div>
        <Animator show={isOpen} height>
          <div data-hook="content" className={styles.collapse}>
            {content}
          </div>
        </Animator>
      </div>
    );
  }
}

export default AccordionItem;
