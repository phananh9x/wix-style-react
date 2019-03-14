import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Tabs from '..';

const items = [
  { id: 1, title: 'First Item' },
  { id: 2, title: 'Second Item' },
  { id: 3, title: 'Third Item' },
  { id: 4, title: 'Fourth item' },
  { id: 6, title: 'Fifth item' },
  { id: 7, title: 'Sixth item' },
  { id: 8, title: 'A very long tab item that may not fit' },
];

class TabsTemplate extends Component {
  state = {
    activeId: items[0].id,
  };

  componentDidUpdate(props) {
    props.onChange(getExampleCode(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(getExampleCode(this.getComponent()));
  }

  getComponent() {
    const { activeId } = this.state;
    const { type, hasDivider, width, sideContent } = this.props;
    const props = { items, activeId, hasDivider };

    if (type) {
      props.type = type;
    }

    if (type === 'uniformSide' && width) {
      props.width = width;
    }

    return (
      <Tabs
        sideContent={sideContent}
        onClick={item => this.setState({ activeId: item.id })}
        dataHook="story-tabs"
        {...props}
      />
    );
  }

  render() {
    return this.getComponent();
  }
}

TabsTemplate.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Tabs.tabTypes),
  hasDivider: PropTypes.bool,
  width: PropTypes.string,
  sideContent: PropTypes.node,
};

function getExampleCode(element) {
  return reactElementToJSXString(element, {
    filterProps: ['onClick'],
    showDefaultProps: false,
  });
}

export default TabsTemplate;
