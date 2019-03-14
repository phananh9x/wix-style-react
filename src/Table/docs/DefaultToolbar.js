import React from 'react';
import { TableContextPropTypes } from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Title,
  Label,
  SelectedCount,
  Divider,
} from 'wix-style-react/TableToolbar';

import Search from 'wix-style-react/Search';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import { Edit, Duplicate, Upload } from 'wix-style-react/new-icons';

export const renderMyTableToolbar = selectionContext => {
  return selectionContext.selectedCount === 0 ? (
    <MainToolbar />
  ) : (
    <BulkActionsToolbar {...selectionContext} />
  );
};

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
BulkActionsToolbar.propTypes = TableContextPropTypes;
