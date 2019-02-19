/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import { Layout, Cell } from 'wix-style-react/Layout';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import { Container, Row, Col } from 'wix-style-react/Grid';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.multipleFormFields, () => (
  <Layout>
    <Cell span={6}>
      <FormField label="Label" dataHook="storybook-formfield-length-count">
        {({ setCharactersLeft }) => (
          <Input
            dataHook="storybook-formfield-length-count-input"
            onChange={event =>
              setCharactersLeft(100 - event.target.value.length)
            }
          />
        )}
      </FormField>
    </Cell>

    <Cell span={6}>
      <FormField
        label="Label"
        labelPlacement="left"
        dataHook="storybook-formfield-inline-label-length-count"
      >
        {({ setCharactersLeft }) => (
          <Input
            dataHook="storybook-formfield-inline-label-length-count-input"
            onChange={event =>
              setCharactersLeft(20 - event.target.value.length)
            }
          />
        )}
      </FormField>
    </Cell>

    <Cell>
      <MessageBoxFunctionalLayout
        title="User Details"
        confirmText="Save"
        width={400}
        cancelText="Cancel"
      >
        <Container fluid>
          <Row stretchViewsVertically>
            <Col span={3}>
              <FormField
                dataHook="storybook-formfield-grid"
                label="User"
                required
              />
            </Col>
            <Col span={9}>
              <Input />
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={3}>
              <FormField label="Email" />
            </Col>
            <Col span={9}>
              <Input />
            </Col>
          </Row>
          <Row stretchViewsVertically>
            <Col span={3}>
              <FormField
                label="Address"
                infoContent="I help you to fill info"
              />
            </Col>
            <Col span={9}>
              <Input />
            </Col>
          </Row>
        </Container>
      </MessageBoxFunctionalLayout>
      ;
    </Cell>
  </Layout>
));
