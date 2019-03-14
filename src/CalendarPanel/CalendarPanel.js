import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarPanel.scss';
import DropdownLayout from '../DropdownLayout';
import Calendar from '../Calendar';
import { DIVIDER_OPTION_VALUE } from '../DropdownLayout/DropdownLayout';

class CalendarPanel extends React.Component {
  static displayName = 'CalendarPanel';

  static propTypes = {
    dataHook: PropTypes.string,
    className: PropTypes.string,

    /** Callback function called with a Date or a Range whenever the user selects a day in the calendar */
    onChange: PropTypes.func.isRequired,

    /** Callback function called whenever user press escape or click outside of the element */
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
        from: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]),
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

    /** Array of calendar presets */
    presets: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          value: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.string,
            PropTypes.func,
          ]).isRequired,
          disabled: PropTypes.bool,
          overrideStyle: PropTypes.bool,
          selectedDays: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date),
            PropTypes.shape({
              from: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date),
              ]).isRequired,
              to: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date),
              ]).isRequired,
            }),
          ]).isRequired,
        }),

        // A divider option without an id
        PropTypes.shape({
          value: PropTypes.oneOf([DIVIDER_OPTION_VALUE]),
        }),
      ]),

      PropTypes.shape({
        selectedDays: PropTypes.object,
        id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
      }),
    ),

    /** A renderProp for the footer. `({selectedDays, submitDisabled}) => void` - `selectedDays` is the same as the CalendarPandel's `value` prop. `submitDisabled` is true when the current selectedDays is not valida for submittion.  */
    footer: PropTypes.func,
  };

  static defaultProps = {
    numOfMonths: 2,
  };
  onSelectPreset = preset => {
    const { onChange } = this.props;
    onChange(preset.selectedDays);
  };

  getSelectedPresetId() {
    const { presets = [], value } = this.props;
    const selectedPreset = presets.find(preset =>
      Calendar.areValuesEqual(preset.selectedDays, value),
    );
    return selectedPreset ? selectedPreset.id : -1;
  }

  isSubmitDisabled() {
    const { selectionMode, value } = this.props;
    if (selectionMode === 'range') {
      return !Boolean(value) || !Boolean(value.from) || !Boolean(value.to);
    }
    return !Boolean(value);
  }

  render() {
    const { dataHook, presets, footer, ...calendarProps } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <div className={styles.calendarWithPresets}>
          {Boolean(presets && presets.length) && (
            <div className={styles.presets}>
              <DropdownLayout
                visible
                inContainer
                onSelect={this.onSelectPreset}
                dataHook={'dropdown-layout'}
                options={presets}
                maxHeightPixels={342}
                selectedId={this.getSelectedPresetId()}
              />
            </div>
          )}
          <Calendar
            {...calendarProps}
            dataHook={'calendar'}
            className={styles.calendar}
          />
        </div>
        {footer && (
          <div className={styles.footer}>
            {footer({
              selectedDays: calendarProps.value,
              submitDisabled: this.isSubmitDisabled(),
            })}
          </div>
        )}
      </div>
    );
  }
}

export default CalendarPanel;
