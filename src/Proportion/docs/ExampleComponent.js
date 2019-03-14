import React, { Component } from 'react';
import AddItem from 'wix-style-react/AddItem';
import Card from 'wix-style-react/Card';
import { Container, Row, Col } from 'wix-style-react/Grid';
import Proportion from 'wix-style-react/Proportion';

export default class ExampleComponent extends Component {
  static displayName = 'ExampleComponent';

  render() {
    return (
      <div
        data-hook="proportion-example-basic"
        style={{ background: '#F0F4F7', padding: 30 }}
      >
        <Container fluid>
          <Row stretchViewsVertically>
            <Col span={4}>
              <Proportion aspectRatio={Proportion.PREDEFINED_RATIOS.square}>
                <AddItem />
              </Proportion>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Header title="Square Proportion" />
                <Card.Content>I don't maintain proportion</Card.Content>
              </Card>
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={4}>
              <Proportion aspectRatio={Proportion.PREDEFINED_RATIOS.portrait}>
                <AddItem />
              </Proportion>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Header title="Portrait Proportion" />
                <Card.Content>I don't maintain proportion</Card.Content>
              </Card>
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={4}>
              <Proportion aspectRatio={Proportion.PREDEFINED_RATIOS.cinema}>
                <AddItem />
              </Proportion>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Header title="Cinema Proportion" />
                <Card.Content>I don't maintain proportion</Card.Content>
              </Card>
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={4}>
              <Proportion aspectRatio={Proportion.PREDEFINED_RATIOS.landscape}>
                <AddItem />
              </Proportion>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Header title="Landscape Proportion" />
                <Card.Content>I don't maintain proportion</Card.Content>
              </Card>
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={4}>
              <Proportion aspectRatio={9.5 / 3}>
                <AddItem />
              </Proportion>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Header title="Custom Proportion (9.5 / 3)" />
                <Card.Content>I don't maintain proportion</Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
