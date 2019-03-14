import React from 'react';

import { Layout, Cell } from 'wix-style-react/Layout';
import Card from 'wix-style-react/Card';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import Checkbox from 'wix-style-react/Checkbox';
import Text from 'wix-style-react/Text';
import Button from 'wix-style-react/Button';
import RadioGroup from 'wix-style-react/RadioGroup';

import styles from '../styles.scss';

export default () => (
  <div className={styles.exampleContainer}>
    <Layout>
      {/* Big area, the main content */}
      <Cell span={8}>
        <Layout>
          <Cell>
            <Card>
              <Card.Header title="Various Inputs" />
              <Card.Content>
                <Layout>
                  <Cell>{field('Your Best Joke:', InputArea)}</Cell>
                  <Cell>{field('Your Email:')}</Cell>
                </Layout>

                {divider()}

                <Layout>
                  <Cell span={6}>{field('First Name:')}</Cell>
                  <Cell span={6}>{field('Second Name:')}</Cell>
                </Layout>

                {divider()}

                <Layout gap="10">
                  <Cell span={3} vertical>
                    <Text>Home Address:</Text>
                  </Cell>
                  <Cell span={9} vertical>
                    {field('')}
                  </Cell>
                </Layout>

                {divider()}

                <Layout gap="10">
                  <Cell>
                    <Text>Get In Touch</Text>
                  </Cell>
                  {['Name', 'Email', 'Phone No.'].map(label => (
                    <Cell
                      key={label}
                      span={4}
                      vertical
                      children={<Input placeholder={label} />}
                    />
                  ))}
                </Layout>

                {divider()}

                <Layout>
                  <Cell span={8} vertical>
                    <Checkbox>I Accept to Decline</Checkbox>
                  </Cell>

                  <Cell span={4}>
                    <Button>Useless Button</Button>
                  </Cell>
                </Layout>
              </Card.Content>
            </Card>
          </Cell>

          {['left', 'right'].map(direction => (
            <Cell span={6} key={direction}>
              {card(`something on the ${direction}`, 'Anything goes')}
            </Cell>
          ))}

          {['left', 'middle', 'right'].map(direction => (
            <Cell span={4} key={direction}>
              {card(`something on the ${direction}`, 'Anything goes')}
            </Cell>
          ))}
        </Layout>
      </Cell>

      {/* sidebar */}
      <Cell span={4}>
        <Card>
          <Card.Header title="Additional Info" />
          <Card.Content>
            <Text>{'No need for <Layout> for just column'}</Text>

            {divider()}

            <RadioGroup>
              {'Mixing and matching components is easy!'
                .split(' ')
                .map(word => (
                  <RadioGroup.Button key={word}>{word}</RadioGroup.Button>
                ))}
            </RadioGroup>

            {divider()}

            <Button>I Agree!</Button>
          </Card.Content>
        </Card>
      </Cell>
    </Layout>
  </div>
);

function field(label, component = Input) {
  return <FormField label={label}>{React.createElement(component)}</FormField>;
}

function divider() {
  return <div style={{ height: 30 }} />;
}

function card(title, children) {
  return (
    <Card>
      <Card.Header title={title} />
      <Card.Content children={children} />
    </Card>
  );
}
