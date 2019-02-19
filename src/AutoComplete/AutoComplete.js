import { func } from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';

class AutoComplete extends InputWithOptions {
  static propTypes = {
    ...InputWithOptions.propTypes,
    predicate: func,
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    predicate: () => true,
  };

  dropdownAdditionalProps() {
    const { options, predicate, emptyStateMessage } = this.props;
    const filterFunc = this.state.isEditing ? predicate : () => true;
    const filtered = options.filter(filterFunc);

    if (emptyStateMessage && filtered.length === 0) {
      return {
        options: [
          {
            id: 'empty-state-message',
            value: emptyStateMessage,
            disabled: true,
          },
        ],
      };
    } else {
      return { options: filtered };
    }
  }
}

export default AutoComplete;
