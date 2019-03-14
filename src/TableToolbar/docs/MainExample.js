import React from 'react';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Label,
  Title,
} from 'wix-style-react/TableToolbar';

import Card from 'wix-style-react/Card';
import Search from 'wix-style-react/Search';
import Dropdown from 'wix-style-react/Dropdown';

export default class MainExample extends React.Component {
  render() {
    const collectionOptions = [
      { id: 0, value: 'All Products' },
      { id: 1, value: 'Towels' },
      { id: 2, value: 'Slippers' },
    ];

    const filterOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Red' },
      { id: 2, value: 'Cyan' },
    ];

    return (
      <Card>
        <TableToolbar>
          <ItemGroup position="start">
            <Item>
              <Title>My Table</Title>
            </Item>
            <Item>
              <Label>
                Collection
                <span style={{ width: '150px' }}>
                  <Dropdown
                    options={collectionOptions}
                    selectedId={0}
                    roundInput
                  />
                </span>
              </Label>
            </Item>
            <Item>
              <Label>
                Filter By
                <span style={{ width: '86px' }}>
                  <Dropdown options={filterOptions} selectedId={0} roundInput />
                </span>
              </Label>
            </Item>
          </ItemGroup>
          <ItemGroup position="end">
            <Item>
              <Search />
            </Item>
          </ItemGroup>
        </TableToolbar>
      </Card>
    );
  }
}
