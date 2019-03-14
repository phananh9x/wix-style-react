import React from 'react';
import { Table } from 'wix-style-react/Table';
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
import TextButton from 'wix-style-react/TextButton';
import { ExternalLink } from 'wix-style-react/new-icons';

import ImagePlaceholder from '../../../stories/utils/ImagePlaceholder';

export class TableEmptyStateExample extends React.Component {
  render() {
    return (
      <Card>
        <Table
          dataHook="story-table-empty-state-example"
          data={[]}
          itemsPerPage={20}
          columns={[
            {
              title: 'Name',
              render: row => <span>{row.name}</span>,
              width: '30%',
              minWidth: '150px',
            },
            {
              title: 'SKU',
              render: row => <span>{row.SKU}</span>,
              width: '20%',
              minWidth: '100px',
            },
            {
              title: 'Price',
              render: row => <span>{row.price}</span>,
              width: '20%',
              minWidth: '100px',
            },
            {
              title: 'Inventory',
              render: row => <span>{row.inventory}</span>,
              width: '20%',
              minWidth: '100px',
            },
          ]}
          showSelection
        >
          <MainToolbar />
          <Table.EmptyState
            title="You haven't added any items yet"
            subtitle="Add items to your website so people can buy them"
            image={<ImagePlaceholder />}
          >
            <TextButton suffixIcon={<ExternalLink />}>
              Learn how to add items
            </TextButton>
          </Table.EmptyState>
        </Table>
      </Card>
    );
  }
}

const MainToolbar = () => {
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
    <TableToolbar>
      <ItemGroup position="start">
        <Item>
          <Title>My Table</Title>
        </Item>
        <Item>
          <Label>
            Collection
            <span style={{ width: '150px' }}>
              <Dropdown options={collectionOptions} selectedId={0} roundInput />
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
  );
};
