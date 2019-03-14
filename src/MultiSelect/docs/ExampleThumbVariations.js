import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import Heading from 'wix-style-react/Heading';
import { Layout, Cell } from 'wix-style-react/Layout';

export default () => (
  <Layout>
    <Cell span={4}>
      <Heading appearance="H3">Sizes</Heading>
    </Cell>
    <Cell span={8}>
      <Layout gap="10px">
        <Cell>
          <MultiSelect
            tags={[
              { id: '1', label: 'tiny-1', size: 'tiny' },
              { id: '2', label: 'tiny-2', size: 'tiny' },
              { id: '3', label: 'tiny-3', size: 'tiny' },
            ]}
          />
        </Cell>
        <Cell>
          <MultiSelect
            tags={[
              { id: '1', label: 'small-1', size: 'small' },
              { id: '2', label: 'small-2', size: 'small' },
              { id: '3', label: 'small-3', size: 'small' },
            ]}
          />
        </Cell>
        <Cell>
          <MultiSelect
            tags={[
              { id: '1', label: 'medium-1', size: 'medium' },
              { id: '2', label: 'medium-2', size: 'medium' },
              { id: '3', label: 'medium-3', size: 'medium' },
            ]}
          />
        </Cell>
        <Cell>
          <MultiSelect
            tags={[
              { id: '1', label: 'large-1', size: 'large' },
              { id: '2', label: 'large-2', size: 'large' },
              { id: '3', label: 'large-3', size: 'large' },
            ]}
          />
        </Cell>
      </Layout>
    </Cell>
    <Cell span={4}>
      <Heading appearance="H3">Theme</Heading>
    </Cell>
    <Cell span={8}>
      <MultiSelect
        tags={[
          { id: '1', label: 'Default' },
          { id: '2', label: 'Error theme', theme: 'error' },
          { id: '3', label: 'Warning theme', theme: 'warning' },
        ]}
      />
    </Cell>
    <Cell span={4}>
      <Heading appearance="H3">Removable / Disabled</Heading>
    </Cell>
    <Cell span={8}>
      <MultiSelect
        tags={[
          { id: '1', label: 'Removable' },
          { id: '2', label: 'Non-Removable', removable: false },
          { id: '3', label: 'Disabled', disabled: true },
        ]}
      />
    </Cell>
    <Cell span={4}>
      <Heading appearance="H3">With Thumb</Heading>
    </Cell>
    <Cell span={8}>
      <MultiSelect
        tags={[
          {
            id: '1',
            label: 'Green',
            thumb: (
              <div
                style={{
                  backgroundColor: 'green',
                  height: '100%',
                  width: '100%',
                }}
              />
            ),
          },
          {
            id: '2',
            label: 'Red',
            thumb: (
              <div
                style={{
                  backgroundColor: 'red',
                  height: '100%',
                  width: '100%',
                }}
              />
            ),
          },
          {
            id: '3',
            label: 'Yellow',
            thumb: (
              <div
                style={{
                  backgroundColor: 'yellow',
                  height: '100%',
                  width: '100%',
                }}
              />
            ),
          },
        ]}
      />
    </Cell>
  </Layout>
);
