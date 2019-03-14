import React from 'react';

import { Container, Row, Col } from 'wix-style-react/Grid';
import Card from 'wix-style-react/Card';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';

export default () => (
  <div style={{ background: '#F0F4F7', padding: 30 }}>
    <Container>
      <Row stretchViewsVertically>
        <Col span={8}>
          <Card stretchVertically>
            <Card.Header
              withoutDivider
              subtitle="subtitle"
              title="Header without Divider"
            />

            <Card.Content>
              <Row>
                <Col span={4}>{field()}</Col>
                <Col span={4}>{field()}</Col>
                <Col span={4}>{field()}</Col>
              </Row>

              <Row>
                <Col span={6}>{field()}</Col>
              </Row>

              <Row>
                <Col span={6}>{field()}</Col>
                <Col span={6}>{field()}</Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>

        <Col span={4}>
          <Card stretchVertically>
            <Card.Header title="Side Card" />
            <Card.Content>
              <Row>
                <Col>{field()}</Col>
              </Row>

              <Row>
                <Col>{field()}</Col>
              </Row>

              <Row>
                <Col>{field()}</Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

function field() {
  return (
    <FormField label="Text Input">
      <Input placeholder="You can type here" />
    </FormField>
  );
}
