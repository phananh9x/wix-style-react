import React from 'react';
import Calendar from 'wix-style-react/Calendar';

class YearMonthsCalendarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date('2017/05/01'),
      excludePastDates: true,
    };
  }

  onChange(date) {
    this.setState({ date });
  }

  render() {
    return (
      <Calendar
        showMonthDropdown
        showYearDropdown
        onChange={date => this.onChange(date)}
        value={this.state.date}
      />
    );
  }
}

export default () => <YearMonthsCalendarExample />;
