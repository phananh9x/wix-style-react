import React from 'react';
import { Container, Row, Col } from 'wix-style-react/Grid';

export default () => (
  <div style={{ background: '#F0F4F7' }}>
    <Container>
      <Row>
        <Col>{text('<Col/>')}</Col>
      </Row>

      <Row>
        <Col span={6}>{text('<Col span={6}/>')}</Col>

        <Col span={6}>{text('<Col span={6}/>')}</Col>
      </Row>

      <Row>
        <Col span={8}>{text('<Col span={8}/>')}</Col>

        <Col span={4}>{text('<Col span={4}/>')}</Col>
      </Row>

      <Row>
        <Col span={6}>{text('<Col span={6}/>')}</Col>

        <Col span={3}>{text('<Col span={3}/>')}</Col>

        <Col span={3}>{text('<Col span={3}/>')}</Col>
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
