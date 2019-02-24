import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import { Container, Row, Col } from 'wix-style-react/Grid';
import { Add } from 'wix-style-react/new-icons';
import s from './ExampleStandAlone.scss';
import { LongTextContent } from './SomeContentComponent';

const ExampleStandAlone = () => (
  <div className={s.fullHeightStoryContainer}>
    <Page upgrade>
      <Page.Header
        title="Your Product"
        actionsBar={
          <Button withNewIcons prefixIcon={<Add />}>
            New Item
          </Button>
        }
      />

      <Page.Content>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header title="Catchy Header" />
                <Card.Content>
                  <LongTextContent />
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </Page>
  </div>
);

export default ExampleStandAlone;
