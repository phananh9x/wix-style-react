import React from 'react';

import Card from 'wix-style-react/Card';
import { Container, Row, Col } from 'wix-style-react/Grid';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import Tooltip from 'wix-style-react/Tooltip';
import Button from 'wix-style-react/Button';
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <div style={{ background: '#F0F4F7', padding: 30 }}>
    <Container>
      <Row>
        <Col span={6}>
          <Card>
            <Card.Header
              title="Card header"
              suffix={
                <Button
                  onClick={() => alert('Clicked')}
                  size="small"
                  theme="fullblue"
                >
                  Click Me!
                </Button>
              }
            />

            <Card.Content>{field()}</Card.Content>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Card.Header
              title="Card header"
              subtitle="Subtitle"
              suffix={
                <Tooltip
                  placement="top"
                  alignment="center"
                  content="And a tooltip!"
                >
                  <div>
                    <TextButton as="a" href="http://www.wix.com/">
                      Link to Wix
                    </TextButton>
                  </div>
                </Tooltip>
              }
            />

            <Card.Content>{field()}</Card.Content>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header
              withoutDivider
              title="Card header without no content"
              suffix={
                <Button
                  onClick={() => alert('Clicked!')}
                  children="Click Me!"
                  size="small"
                  theme="fullblue"
                />
              }
            />
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
