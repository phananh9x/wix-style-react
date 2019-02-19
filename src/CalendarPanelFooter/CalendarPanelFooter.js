import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import { Item, ItemGroup, Toolbar } from '../TableToolbar';
import Calendar from '../Calendar';
import Button from '../Button';

class CalendarPanelFooter extends React.PureComponent {
  static displayName = 'CalendarPanelFooter';

  static propTypes = {
    dataHook: PropTypes.string,
    primaryActionLabel: PropTypes.string.isRequired,
    secondaryActionLabel: PropTypes.string.isRequired,
    primaryActionDisabled: PropTypes.bool.isRequired,
    primaryActionOnClick: PropTypes.func.isRequired,
    secondaryActionOnClick: PropTypes.func.isRequired,
    selectedDays: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]),
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      }),
    ]),
    /** Formats a Date into a string for displaying the current slected days. Receives a Date instance (not undefined). */
    dateToString: PropTypes.func.isRequired,
  };

  render() {
    const {
      dataHook,
      dateToString,
      secondaryActionLabel,
      primaryActionLabel,
      selectedDays: selectedDaysProp,
      primaryActionDisabled,
      primaryActionOnClick,
      secondaryActionOnClick,
    } = this.props;

    function getSelectedDaysString(selectedDaysRaw) {
      if (!selectedDaysRaw) {
        return '';
      }
      const selectedDays = Calendar.parseValue(selectedDaysRaw);
      if (Calendar.isRangeValue(selectedDays)) {
        const toSuffix = selectedDays.to
          ? ` ${dateToString(selectedDays.to)}`
          : '';
        return `${dateToString(selectedDays.from)} -${toSuffix}`;
      } else {
        return dateToString(selectedDays);
      }
    }

    return (
      <div data-hook={dataHook}>
        <Toolbar>
          <ItemGroup position="start">
            <Item>
              <Text
                size="small"
                weight="thin"
                secondary
                dataHook="selected-days-text"
              >
                {getSelectedDaysString(selectedDaysProp)}
              </Text>
            </Item>
          </ItemGroup>
          <ItemGroup position="end">
            <Item>
              <Button
                priority="secondary"
                dataHook="secondary-action-button"
                onClick={secondaryActionOnClick}
              >
                {secondaryActionLabel}
              </Button>
            </Item>
            <Item>
              <Button
                disabled={primaryActionDisabled}
                dataHook="primary-action-button"
                onClick={primaryActionOnClick}
              >
                {primaryActionLabel}
              </Button>
            </Item>
          </ItemGroup>
        </Toolbar>
      </div>
    );
  }
}

export default CalendarPanelFooter;
