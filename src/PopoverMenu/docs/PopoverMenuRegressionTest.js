import React from 'react';
import { storiesOf } from '@storybook/react';

import PopoverMenu from '..';
import PopoverMenuItem from '../../PopoverMenuItem';
import { TESTS_PREFIX } from '../../../stories/storiesHierarchy';

class TestComponent extends React.Component {
  state = {
    menus: [0],
  };

  handleDeleteMenuItem = deletedItemId => {
    this.setState({
      menus: this.state.menus.filter(id => id !== deletedItemId),
    });
  };

  render() {
    return (
      <div style={{ marginLeft: 100, marginTop: 100 }}>
        {this.state.menus.map(key => (
          <PopoverMenu
            dataHook={`popover-${key}`}
            key={key}
            placement="bottom"
            appendToParent
          >
            <PopoverMenuItem
              dataHook={`popover-item-${key}`}
              text="Delete"
              onClick={() => this.handleDeleteMenuItem(key)}
            />
          </PopoverMenu>
        ))}
      </div>
    );
  }
}

const kind = `${TESTS_PREFIX}/7. Tooltip`;

storiesOf(kind, module).add('7.3. Popover Menu', () => <TestComponent />);
