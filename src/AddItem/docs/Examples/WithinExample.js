import React from 'react';
import AddItem from 'wix-style-react/AddItem';
import Card from 'wix-style-react/Card';

export default () => (
  <Card>
    <Card.Header title="Sections in Menu" />
    <Card.Content>
      <AddItem theme="dashes" size="tiny">
        Add New Item
      </AddItem>
    </Card.Content>
  </Card>
);
