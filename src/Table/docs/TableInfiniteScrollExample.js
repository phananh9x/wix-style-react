import { Table } from 'wix-style-react/Table';
import React from 'react';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Label,
} from 'wix-style-react/TableToolbar';

import Loader from 'wix-style-react/Loader';

import Card from 'wix-style-react/Card';
import Page from 'wix-style-react/Page';

const baseDataSet = [
  {
    id: `1`,
    name: `Apple Towels`,
    SKU: '111222',
    price: '$2.00',
    inventory: 'In stock',
    collectionId: 1,
  },
  {
    id: `2`,
    name: `Cyan Towels`,
    SKU: '222333',
    price: '$2.00',
    inventory: 'In stock',
    collectionId: 1,
    filterId: 2,
  },
  {
    id: `3`,
    name: `Marble Slippers`,
    SKU: '333444',
    price: '$14.00',
    inventory: 'In stock',
    collectionId: 2,
  },
  {
    id: `4`,
    name: `Red Slippers`,
    SKU: '444555',
    price: '$14.00',
    inventory: 'Out of stock',
    collectionId: 2,
    filterId: 1,
  },
];

const generateData = count => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data = data.concat(baseDataSet);
  }
  return data;
};

export class TableInfiniteScrollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollableContentRef: null,
      hasMore: true,
      count: 5,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  renderMainToolbar() {
    return (
      <Card>
        <TableToolbar>
          <ItemGroup position="start">
            <Item>
              <Label>Product</Label>
            </Item>
          </ItemGroup>
        </TableToolbar>
      </Card>
    );
  }

  renderLoader() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 0',
        }}
      >
        <Loader />
      </div>
    );
  }

  loadMore() {
    const loadMoreData = () => {
      this.setState({ count: this.state.count + 5 });
      if (this.state.count > 20) {
        this.setState({ hasMore: false });
      }
    };
    setTimeout(loadMoreData, 1000);
  }

  render() {
    return (
      <div
        style={{
          height: '800px',
          paddingBottom: '16px',
          display: 'flex',
          flexFlow: 'column',
          minWidth: '966px',
        }}
      >
        <Table
          withWrapper={false}
          dataHook="story-table-infinite-example"
          data={generateData(this.state.count)}
          itemsPerPage={20}
          infiniteScroll
          hasMore={this.state.hasMore}
          loadMore={this.loadMore}
          scrollElement={this.state.scrollableContentRef}
          loader={this.renderLoader()}
          columns={[
            {
              title: 'Name',
              render: row => row.name,
              width: '30%',
              minWidth: '150px',
            },
            {
              title: 'SKU',
              render: row => row.SKU,
              width: '20%',
              minWidth: '100px',
            },
            {
              title: 'Price',
              render: row => row.price,
              width: '20%',
              minWidth: '100px',
            },
            {
              title: 'Inventory',
              render: row => row.inventory,
              width: '20%',
              minWidth: '100px',
            },
          ]}
          showLastRowDivider
        >
          <Page
            scrollableContentRef={scrollableContentRef =>
              !this.state.scrollableContentRef &&
              this.setState({ scrollableContentRef })
            }
          >
            <Page.Header title="My Table Title" />
            <Page.Content>
              <Card>
                <Table.Content titleBarVisible={false} />
              </Card>
            </Page.Content>
          </Page>
        </Table>
      </div>
    );
  }
}
