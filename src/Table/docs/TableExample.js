import React from 'react';
import { Table, ToolbarContextPropTypes } from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Label,
  Title,
  SelectedCount,
  Divider,
} from 'wix-style-react/TableToolbar';

import Card from 'wix-style-react/Card';
import Search from 'wix-style-react/Search';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import { Edit, Duplicate, Upload } from 'wix-style-react/new-icons';

const baseData = [
  {
    name: 'Apple Towels',
    SKU: '111222',
    price: '$2.00',
    inventory: 'In stock',
  },
  { name: 'Cyan Towels', SKU: '222333', price: '$2.00', inventory: 'In stock' },
  {
    name: 'Marble Slippers',
    SKU: '333444',
    price: '$14.00',
    inventory: 'In stock',
  },
  {
    name: 'Red Slippers',
    SKU: '444555',
    price: '$14.00',
    inventory: 'Out of stock',
  },
];

export class TableExample extends React.Component {
  render() {
    return (
      <Card>
        <Table
          dataHook="story-table-example"
          data={baseData}
          itemsPerPage={20}
          columns={[
            {
              title: 'Name',
              render: row => <span>{row.name}</span>,
              width: '30%',
              minWidth: '150px',
              infoTooltipProps: { content: 'This is the name column' },
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
          <Table.ToolbarContainer>
            {selectionContext =>
              selectionContext.selectedCount === 0 ? (
                <MainToolbar />
              ) : (
                <BulkActionsToolbar {...selectionContext} />
              )
            }
          </Table.ToolbarContainer>
          <Table.Content />
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

const BulkActionsToolbar = props => (
  <TableToolbar>
    <ItemGroup position="start">
      <Item>
        <SelectedCount>{`${props.selectedCount} Selected`}</SelectedCount>
      </Item>
    </ItemGroup>
    <ItemGroup position="end">
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Upload />}
          onClick={() =>
            window.alert(`Exporting selectedIds=${props.getSelectedIds()}`)
          }
        >
          Export
        </Button>
      </Item>
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Duplicate />}
          onClick={() =>
            window.alert(`Duplicating selectedIds=${props.getSelectedIds()}`)
          }
        >
          Duplicate
        </Button>
      </Item>
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Edit />}
          onClick={() =>
            window.alert(`Editing selectedIds=${props.getSelectedIds()}`)
          }
        >
          Edit
        </Button>
      </Item>
      <Divider />
      <Item>
        <Search expandable />
      </Item>
    </ItemGroup>
  </TableToolbar>
);
BulkActionsToolbar.propTypes = ToolbarContextPropTypes;
