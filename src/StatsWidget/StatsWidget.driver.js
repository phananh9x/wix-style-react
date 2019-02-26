import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';
import headerDriverFactory from '../Card/Header/Header.driver';
import { badgeDriverFactory } from 'wix-ui-backoffice/dist/src/components/Badge/Badge.driver';
import { findByHook } from '../../test/utils';

const statsWidgetDriverFactory = ({ element }) => {
  const getBadgeDriver = elm => badgeDriverFactory({ element: elm });

  const getStatistic = index =>
    findByHook(element, 'stats-widget-content-wrapper').childNodes[index];

  const getSuffix = () => findByHook(element, 'suffix');

  const headerElement = findByHook(element, 'stats-widget-title');

  const headerDriver = headerDriverFactory({
    wrapper: element,
    element: headerElement,
  });

  return {
    exists: () => !!element,

    getSuffixElementByHook: () => {
      return findByHook(getSuffix(), 'suffix-element-hook').textContent;
    },

    /** returns header title  */
    titleText: () => headerDriver.title(),

    /** fulfilled if element in the DOM  */
    isStatisticsContentExists: () =>
      !!findByHook(element, 'stats-widget-content-wrapper'),

    /** fulfilled if element in the DOM  */
    isEmptyStateExists: () => !!findByHook(element, 'stats-widget-empty-state'),

    /** returns title of statistics with index passed as param  */
    getStatisticTitle: index =>
      findByHook(getStatistic(index), 'statistics-item-title').textContent,

    /** returns subitle of statistics with index passed as param  */
    getStatisticSubTitle: index =>
      findByHook(getStatistic(index), 'statistics-item-subtitle').textContent,

    /** returns percents value of statistics with index passed as param  */
    getStatisticPercentValue: index =>
      findByHook(getStatistic(index), 'percent-value').textContent,

    /** Check if percent negative value skin equals to `danger`  */
    isNegativePercentValue: index =>
      getBadgeDriver(
        findByHook(getStatistic(index), 'percent-value'),
      ).getSkin() === 'danger',

    /** returns all classes of percent wrapper element of statistics with index passed as param  */
    getStatisticPercentClass: index => {
      const percentIcon = findByHook(getStatistic(index), 'percent-icon');
      return (percentIcon && percentIcon.getAttribute('data-class')) || '';
    },

    getFilterButtonDriver: dataHook => ({
      dropdownLayoutDriver: dropdownLayoutDriverFactory({
        element: findByHook(
          findByHook(element, dataHook),
          'dropdown-base-dropdownlayout',
        ),
      }),
    }),
  };
};

export default statsWidgetDriverFactory;
