import React from 'react';
import { Table } from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Title,
} from 'wix-style-react/TableToolbar';

import Card from 'wix-style-react/Card';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Checkbox from 'wix-style-react/Checkbox';

export class TableColumnAlignmentExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { name: 'Apple Towels', visible: true, onSale: false, price: '$22.99' },
        { name: 'Cyan Towls', visible: false, onSale: false, price: '$145.99' },
        {
          name: 'Marble Slippers',
          visible: false,
          onSale: false,
          price: '$125,265.00',
        },
        {
          name: 'Red Slippers',
          visible: false,
          onSale: false,
          price: '$1,265.69',
        },
      ],
    };
  }

  updateRow(rowNum, data) {
    this.setState({
      data: this.state.data.map((row, index) => {
        if (index !== rowNum) {
          return { ...row };
        }

        return {
          ...row,
          ...data,
        };
      }),
    });
  }

  render() {
    return (
      <Card>
        <Table
          dataHook="story-table-column-alignment-example"
          data={this.state.data}
          itemsPerPage={20}
          columns={[
            {
              title: 'Name',
              render: row => <span>{row.name}</span>,
              width: '30%',
              minWidth: '150px',
            },
            {
              title: 'Visibility',
              render: (row, rowNum) => (
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <ToggleSwitch
                    checked={row.visible}
                    onChange={() =>
                      this.updateRow(rowNum, { visible: !row.visible })
                    }
                  />
                  <span style={{ marginLeft: 12 }}>
                    {row.visible ? 'Visible' : 'Hidden'}
                  </span>
                </span>
              ),
              width: '20%',
              minWidth: '100px',
              align: 'start',
            },
            {
              title: 'On Sale',
              render: (row, rowNum) => (
                <Checkbox
                  checked={row.onSale}
                  onChange={() =>
                    this.updateRow(rowNum, { onSale: !row.onSale })
                  }
                />
              ),
              width: '20%',
              minWidth: '100px',
              align: 'center',
              infoTooltipProps: {
                content: 'I am a Tooltip!',
              },
            },
            {
              title: 'Price',
              render: row => <span>{row.price}</span>,
              width: '20%',
              minWidth: '100px',
              align: 'end',
            },
          ]}
        >
          <MainToolbar />
          <Table.Content />
        </Table>
      </Card>
    );
  }
}

const MainToolbar = () => {
  return (
    <TableToolbar>
      <ItemGroup position="start">
        <Item>
          <Title>My Table</Title>
        </Item>
      </ItemGroup>
    </TableToolbar>
  );
};
