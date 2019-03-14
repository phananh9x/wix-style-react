import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const generateOption = id => {
  return { id, value: 'options ' + id };
};

export default class ExampleInfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.itemsPerPage = 15;
    this.total = 300;
    this.state = { hasMore: true, data: [] };
  }

  style = {
    display: 'inline-block',
    padding: '0 5px',
    width: '240px',
    lineHeight: '22px',
  };

  generateData = () => {
    const newOptions = [];
    for (let i = 0; i < this.itemsPerPage; i++) {
      newOptions.push(generateOption(this.state.data.length + i));
    }
    this.setState({ data: this.state.data.concat(newOptions) });
  };

  loadMore() {
    const loadMoreData = () => {
      if (this.state.data.length >= this.total) {
        this.setState({ hasMore: false });
      } else {
        this.generateData();
      }
    };
    setTimeout(loadMoreData, 500);
  }

  render = () => {
    return (
      <div style={this.style}>
        <DropdownLayout
          infiniteScroll
          dataHook={'infinite-scroll-dropdownLayout'}
          visible
          onSelect={item => alert(item.value + ' was selected!')}
          hasMore={this.state.hasMore}
          loadMore={this.loadMore}
          options={this.state.data}
        />
      </div>
    );
  };
}
