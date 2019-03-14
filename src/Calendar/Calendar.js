import styles from './Calendar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker/DayPicker';
import classNames from 'classnames';
import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';
import startOfMonth from 'date-fns/start_of_month';
import parse from 'date-fns/parse';
import isSameDay from 'date-fns/is_same_day';
import { CalendarView } from './utils';

import WixComponent from '../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from './DatePickerHead';

export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    className: '',
    filterDate: () => true,
    shouldCloseOnSelect: true,
    onClose: () => {},
    autoFocus: true,
  };

  constructor(props) {
    super(props);

    const initialMonth = Calendar.getUpdatedMonth(
      props.value,
      props.numOfMonths,
    );
    this.state = {
      month: initialMonth || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const month = Calendar.getUpdatedMonth(
        nextProps.value,
        nextProps.numOfMonths,
        this.state.month,
      );
      if (month) {
        this.setState({ month });
      }
    }
  }

  static areValuesEqual(value1 = {}, value2 = {}) {
    if (!Boolean(value1) && !Boolean(value2)) {
      return true;
    }

    if (Calendar.isRangeValue(value1) && Calendar.isRangeValue(value2)) {
      return (
        isSameDay(value1.from, value2.from) && isSameDay(value1.to, value2.to)
      );
    }

    return isSameDay(value1, value2);
  }

  static renderDay(day, modifiers) {
    const relevantModifiers = ['start', 'end', 'selected'];
    for (const modifier of relevantModifiers) {
      if (modifier in modifiers) {
        return (
          <div
            className={styles.dayCircle}
            data-date={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
          >
            {day.getDate()}
          </div>
        );
      }
    }

    return (
      <div
        data-date={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
      >
        {day.getDate()}
      </div>
    );
  }

  _setMonth = month => {
    this.setState({ month });
  };

  _handleDayClick = (value, modifiers = {}, event = null) => {
    this._preventActionEventDefault(event);
    const propsValue = this.props.value || {};
    const { onChange, shouldCloseOnSelect } = this.props;

    if (this.props.selectionMode === 'range') {
      if (
        (!propsValue.from && !propsValue.to) ||
        (propsValue.from && propsValue.to)
      ) {
        onChange({ from: value }, modifiers);
      } else {
        const anchor = propsValue.from || propsValue.to;
        const newVal =
          anchor < value
            ? { from: anchor, to: value }
            : { from: value, to: anchor };

        onChange(newVal, modifiers);
        shouldCloseOnSelect && this.props.onClose(event);
      }
    } else {
      onChange(value, modifiers);
      shouldCloseOnSelect && this.props.onClose(event);
    }
  };

  static optionalParse = dateOrString =>
    typeof dateOrString === 'string' ? parse(dateOrString) : dateOrString;

  /** Return a value in which all string-dates are parsed into Date objects */
  static parseValue = value => {
    if (!value) {
      return new Date();
    }
    if (typeof value === 'string') {
      return parse(value);
    } else if (value instanceof Date) {
      return value;
    } else {
      return {
        from: Calendar.optionalParse(value.from),
        to: Calendar.optionalParse(value.to),
      };
    }
  };

  static isSingleDay(value) {
    return value instanceof Date;
  }

  static isRangeValue(value) {
    return Boolean(value.from || value.to);
  }

  static getUpdatedMonth = (nextPropsValue, numOfMonths, currentMonthDate) => {
    const nextValue = Calendar.parseValue(nextPropsValue);

    if (!currentMonthDate) {
      return Calendar.isSingleDay(nextValue)
        ? nextValue
        : nextValue.from || nextValue.to;
    }

    const view = new CalendarView(currentMonthDate, numOfMonths);

    if (Calendar.isSingleDay(nextValue)) {
      if (!view.isContained(nextValue)) {
        return nextValue;
      }
    } else {
      const { from, to } = nextValue;

      if (from && view.isAfterView(from)) {
        //         F--- =>  F---
        //   VVVVV      =>  VVVVV
        return from;
      } else if (to && view.isBeforeView(to)) {
        if (view.isRangeFits(from, to)) {
          //   F-T        =>  F-T
          //       VVVVV  =>  VVVVV
          return from;
        } else {
          //   F-----T        =>  F-----T
          //          VVVVV    =>    VVVVV
          return subMonths(to, numOfMonths - 1);
        }
      } else if (
        from &&
        view.isBeforeView(from) &&
        to &&
        view.isAfterView(to)
      ) {
        //   F-------T  =>    F-------T
        //     VVVVV    =>    VVVVV
        return from; // choose the 'from' anchor arbitrarly
      }
    }
    /*
     * We only changed the month if the day (or range.edges) are outside the view.
     * This is to avoid changing the month right after a user clicks on the calendar.
     */
    return null;
  };

  _getSelectedDays(value) {
    const { from, to } = value || {};
    if (from && to) {
      return { from: from, to: to };
    } else if (from) {
      return { after: prevDay(from) };
    } else if (to) {
      return { before: nextDay(to) };
    } else {
      // Single day OR empty value
      return value;
    }
  }

  _preventActionEventDefault = (event = null) => {
    // We should not prevent "TAB"/"ESC" key
    if (event && (!event.keyCode || !this.keyHandlers[event.keyCode])) {
      event.preventDefault();
    }
  };

  _createCaptionElement = month => {
    const { locale, showMonthDropdown, showYearDropdown } = this.props;

    const localeUtils = localeUtilsFactory(locale);

    return (
      <DatePickerHead
        {...{
          date: month,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          onChange: this._setMonth,
          onLeftArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, -1))),
          onRightArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, 1))),
        }}
      />
    );
  };

  _createDayPickerProps = () => {
    const { locale, filterDate, excludePastDates, numOfMonths } = this.props;

    const value = Calendar.parseValue(this.props.value);

    const month = this.state.month;
    const localeUtils = localeUtilsFactory(locale);
    const { from, to } = value || {};
    const singleDay = !from && !to && value;

    const firstOfMonth = [
      new Date(month.getFullYear(), month.getMonth(), 1),
      new Date(month.getFullYear(), month.getMonth() + 1, 1),
    ];
    const lastOfMonth = [
      new Date(month.getFullYear(), month.getMonth() + 1, 0),
      new Date(month.getFullYear(), month.getMonth() + 2, 0),
    ];

    const captionElement = this._createCaptionElement(month);
    const selectedDays = this._getSelectedDays(value);

    return {
      disabledDays: excludePastDates
        ? { before: new Date() }
        : date => !filterDate(date),
      initialMonth: month,
      initialYear: month,
      selectedDays,
      month,
      year: month,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement,
      onCaptionClick: this._preventActionEventDefault,
      onDayKeyDown: this._handleDayKeyDown,
      numberOfMonths: numOfMonths,
      className: numOfMonths > 1 ? styles.TwoMonths : '',
      modifiers: { start: from, end: to, firstOfMonth, lastOfMonth, singleDay },
      renderDay: Calendar.renderDay,
    };
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler(event);
  };

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose,
  };

  _focusSelectedDay = () => {
    if (this.dayPickerRef) {
      const selectedDay = this.dayPickerRef.dayPicker.querySelector(
        '.DayPicker-Day--selected',
      );

      if (selectedDay) {
        selectedDay.classList.add('DayPicker-Day--unfocused');
        selectedDay.focus();
      }
    }
  };

  _handleDayKeyDown = (_value, _modifiers, event = null) => {
    this._preventActionEventDefault(event);

    const unfocusedDay = this.dayPickerRef.dayPicker.querySelector(
      '.DayPicker-Day--unfocused',
    );

    if (unfocusedDay) {
      unfocusedDay.classList.remove('DayPicker-Day--unfocused');
    }
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.autoFocus && this._focusSelectedDay();
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    if (!prevProps.autoFocus && this.props.autoFocus) {
      this._focusSelectedDay();
    }
  }

  render() {
    return (
      <div
        className={classNames(styles.calendar, this.props.className)}
        onClick={this._preventActionEventDefault}
      >
        <DayPicker
          ref={ref => (this.dayPickerRef = ref)}
          {...this._createDayPickerProps()}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Auto focus on selected day when component mounts or updates */
  autoFocus: PropTypes.bool,

  /** Display multiple months, currently allowing only 1 or 2 */
  numOfMonths: PropTypes.oneOf([1, 2]),

  className: PropTypes.string,

  /** Callback function called with a Date or a Range whenever the user selects a day in the calendar */
  onChange: PropTypes.func.isRequired,

  /** Callback function called whenever user press escape or click outside of the element or a date is selected and `shouldCloseOnSelect` is set. Receives an event as first argument */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** The selected date */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    }),
  ]),

  /** Whether the user should be able to select a date range, or just a single day */
  selectionMode: PropTypes.oneOf(['day', 'range']),

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

  /** should the calendar close on day selection */
  shouldCloseOnSelect: PropTypes.bool,

  /** DatePicker instance locale */
  locale: PropTypes.oneOfType([
    PropTypes.oneOf([
      'en',
      'es',
      'pt',
      'fr',
      'de',
      'pl',
      'it',
      'ru',
      'ja',
      'ko',
      'tr',
      'sv',
      'no',
      'nl',
      'da',
      'zh',
      'th',
      'cs',
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object,
    }),
  ]),
};

function nextDay(date) {
  const day = new Date(date);
  day.setDate(day.getDate() + 1);
  return day;
}

function prevDay(date) {
  const day = new Date(date);
  day.setDate(day.getDate() - 1);
  return day;
}
