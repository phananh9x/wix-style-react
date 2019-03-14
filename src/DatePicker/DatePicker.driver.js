import inputDriverFactory from '../Input/Input.driver';
import calendarDriverFactory from '../Calendar/Calendar.driver';
import styles from '../Input/Input.scss';

const datePickerDriverFactory = ({ element }) => {
  const inputRoot = element && element.querySelector(`.${styles.root}`);
  const inputDriver = inputDriverFactory({ element: inputRoot });
  const calendarDriver = calendarDriverFactory({ element });

  const driver = {
    exists: () => !!element,
    open: () => inputDriver.focus(),
  };

  return {
    driver,
    inputDriver,
    calendarDriver,
  };
};

export default datePickerDriverFactory;
