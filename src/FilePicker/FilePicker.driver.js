const filePickerDriverFactory = ({ element }) => {
  const error = element.querySelector(`[data-hook=filePicker-error]`);
  const input = element.querySelector(`input`);
  const subLabel = element.querySelector(`[data-hook="sub-label"]`);
  const mainLabel = element.querySelector(`[data-hook="main-label"]`);

  return {
    exists: () => !!element,

    /** fulfilled if element has an error  */
    hasError: () => !!error,

    /** returns FilePicker error message text  */
    errorMessage: () => error.textContent,

    /** returns FilePicker input element  */
    getInput: () => input.textContent,

    /** returns FilePicker subLabel text  */
    getSubLabel: () => subLabel.textContent,

    /** returns FilePicker mainLabel text  */
    getMainLabel: () => mainLabel.textContent,

    /** returns FilePicker input name  */
    getName: () => input.name,
  };
};

export default filePickerDriverFactory;
