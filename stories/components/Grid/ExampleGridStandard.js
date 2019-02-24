import React from 'react';
import { Container, Row, Col } from 'wix-style-react/Grid';
import Card from 'wix-style-react/Card';
import styles from './ExampleGrid.scss';

export default () => (
  <div className={styles.exampleContainer}>
    <Container>
      <Row>
        <Col span={8}>
          <Card>
            <Card.Header subtitle="Card Subtitle" title="Card Header" />

            <Card.Content>
              <Container fluid>
                <Row>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                </Row>

                <Row>
                  <Col span={6}>{text('<Col span={6}/>')}</Col>
                </Row>

                <Row>
                  <Col span={6}>{text('<Col span={6}/>')}</Col>
                  <Col span={3}>{text('<Col span={3}/>')}</Col>
                  <Col span={3}>{text('<Col span={3}/>')}</Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Card.Header title="Side Card" />

            <Card.Content>
              <Container fluid>
                <Row>
                  <Col span={12}>{text('<Col span={12}/>')}</Col>
                </Row>
                <Row>
                  <Col span={6}>{text('<Col span={6}/>')}</Col>
                  <Col span={6}>{text('<Col span={6}/>')}</Col>
                </Row>
                <Row>
                  <Col span={12}>{text('<Col span={12}/>')}</Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Card>
            <Card.Header title="Full width Card" />

            <Card.Content>
              <Container fluid>
                <Row>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                  <Col span={4}>{text('<Col span={4}/>')}</Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

function text(children) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,.1)',
        width: '100%',
        height: '50px',
      }}
      children={children}
    />
  );
}
