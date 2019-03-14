import React from 'react';
import EditableSelector from '..';
import { Container, Row, Col } from '../../Grid';
import Card from '../../Card';
import { storySettings } from './storySettings';

class CardWithEditableSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ title: 'Pumpkin Seeds' }, { title: 'Sunflower Seeds' }],
      selectedIndex: null,
    };
  }

  onOptionAdded = ({ newTitle }) => {
    this.setState({
      options: [...this.state.options, { title: newTitle }],
    });
  };

  onOptionEdit = ({ newTitle, index }) => {
    this.setState({
      options: this.state.options.map((option, i) =>
        index === i ? { title: newTitle } : option,
      ),
    });
  };

  onOptionToggle = index => {
    const selectedIndex = this.state.selectedIndex;
    if (index === selectedIndex) {
      return;
    }
    const newOptions = this.state.options.map(opt => Object.assign({}, opt));
    if (selectedIndex !== null) {
      newOptions[selectedIndex].isSelected = false;
    }
    newOptions[index].isSelected = true;
    this.setState({
      options: newOptions,
      selectedIndex: index,
    });
  };

  onOptionDelete = ({ index }) => {
    let newSelectedIndex = this.state.selectedIndex;
    if (index === this.state.selectedIndex) {
      newSelectedIndex = null;
    } else if (index < this.state.selectedIndex) {
      newSelectedIndex = 1;
    }
    this.setState({
      options: this.state.options.filter((option, i) => index !== i),
      selectedIndex: newSelectedIndex,
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: '#f0f4f7', padding: '20px' }}>
        <Container>
          <Row>
            <Col span={4}>
              <Card>
                <Card.Header title="Editable Selector Inside Card" />
                <Card.Content>
                  <EditableSelector
                    dataHook={storySettings.dataHook}
                    onOptionAdded={params => this.onOptionAdded(params)}
                    onOptionEdit={params => this.onOptionEdit(params)}
                    onOptionDelete={params => this.onOptionDelete(params)}
                    onOptionToggle={params => this.onOptionToggle(params)}
                    toggleType={'radio'}
                    title="Type of Seeds"
                    options={this.state.options}
                  />
                  &nbsp;
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CardWithEditableSelector;
