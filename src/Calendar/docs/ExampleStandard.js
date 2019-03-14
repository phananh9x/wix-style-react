import React from 'react';
import Calendar from 'wix-style-react/Calendar';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Label from 'wix-style-react/Label';

class ControlledCalendarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { from: new Date('2018/11/14'), to: new Date('2018/11/18') },
      excludePastDates: false,
      twoMonths: false,
      selectionMode: 'range',
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  onMonthChange(value) {
    this.setState({ month: value });
  }

  toggleExclude() {
    this.setState(({ excludePastDates }) => ({
      excludePastDates: !excludePastDates,
    }));
  }

  toggleSelectionMode() {
    this.setState({
      selectionMode: this.state.selectionMode === 'day' ? 'range' : 'day',
    });
  }

  render() {
    return (
      <div>
        <Calendar
          excludePastDates={this.state.excludePastDates}
          onChange={value => this.onChange(value)}
          onMonthChange={value => this.onMonthChange(value)}
          value={this.state.value}
          month={this.state.month}
          selectionMode={this.state.selectionMode}
          twoMonths={this.state.twoMonths}
        />
        <div style={{ display: 'flex' }}>
          <ToggleSwitch
            checked={this.state.excludePastDates}
            onChange={() => this.toggleExclude()}
          />
          <Label>Exclude Past Days</Label>
        </div>
        <div style={{ display: 'flex' }}>
          <ToggleSwitch
            checked={this.state.selectionMode === 'day'}
            onChange={() => this.toggleSelectionMode()}
          />
          <Label>
            Selection Mode:{' '}
            {this.state.selectionMode === 'day' ? 'Single day' : 'Date range'}
          </Label>
        </div>
      </div>
    );
  }
}

export default () => <ControlledCalendarExample />;
