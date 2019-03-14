import React from 'react';
import { Container, Col, Row } from 'wix-style-react/Grid';
import AddItem from 'wix-style-react/AddItem';

export default () => (
  <Container>
    <div style={{ padding: '30px', background: '#F0F4F7' }}>
      <Row stretchViewsVertically>
        <Col span={3}>
          <div style={{ height: '240px' }}>
            <AddItem size="large">
              Add New Item with a ridiculous length that doens’t fit in one line
            </AddItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{ height: '200px' }}>
            <AddItem size="medium">
              Add New Item with a ridiculous length that doens’t fit in one line
            </AddItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{ height: '130px' }}>
            <AddItem size="small">
              Add New Item with a ridiculous length that doens’t fit in one line
            </AddItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{ height: '55px' }}>
            <AddItem size="tiny">
              Add New Item with a ridiculous length that doens’t fit in one line
            </AddItem>
          </div>
        </Col>
      </Row>
    </div>
  </Container>
);
