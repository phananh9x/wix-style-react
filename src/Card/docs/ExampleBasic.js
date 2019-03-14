import React from 'react';

import Card from 'wix-style-react/Card';
import Input from 'wix-style-react/Input';
import FormField from 'wix-style-react/FormField';

export default () => (
  <div
    data-hook="card-example-basic"
    style={{ background: '#F0F4F7', padding: 30 }}
  >
    <Card>
      <Card.Header title="Simple Card" />

      <Card.Content>
        <FormField label="Type your joke below">
          <Input />
        </FormField>
      </Card.Content>

      <Card.Divider />

      <Card.Content>
        <FormField label="Type your tragedy below">
          <Input />
        </FormField>
      </Card.Content>
    </Card>
  </div>
);
