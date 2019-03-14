import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'wix-style-react/Grid';
import Heading from 'wix-style-react/Heading';
import Text from 'wix-style-react/Text';
import AddItem from 'wix-style-react/AddItem';
import Card from 'wix-style-react/Card';

export default () => (
  <Row stretchViewsVertically>
    <Col span={6}>
      <Card>
        <Card.Content>
          <CenterElements>
            <div
              style={{
                height: 120,
                width: 120,
                backgroundColor: '#dfe5eb',
                borderRadius: '50%',
              }}
            />
          </CenterElements>
          <CenterElements>
            <Heading appearance="H4">Clark Broke</Heading>
            <Text>jen@yoga.train</Text>
          </CenterElements>
        </Card.Content>
      </Card>
    </Col>
    <Col span={6}>
      <AddItem size="medium">Add New Staff Member</AddItem>
    </Col>
  </Row>
);

const CenterElements = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '15px',
    }}
  >
    {children}
  </div>
);

CenterElements.propTypes = {
  children: PropTypes.node,
};
