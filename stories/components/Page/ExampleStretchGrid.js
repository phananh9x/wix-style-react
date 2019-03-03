import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';

import { Breadcrumbs } from 'wix-style-react/Breadcrumbs';
import Box from 'wix-style-react/Box';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';
import { Row, Col, Container } from 'wix-style-react/Grid';

class Example extends React.Component {
  render() {
    return (
      <ExamplePageContainer>
        <Page upgrade>
          {this.renderHeader()}
          <Page.Content>
            <Container stretchVertically>
              <Row stretchViewsVertically>
                <Col>
                  <Card stretchVertically>
                    <Card.Content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam facilisis molestie magna vitae pellentesque. Ut
                      elementum accumsan nibh, ut faucibus velit. Vestibulum at
                      mollis justo. Vestibulum ante ipsum primis in faucibus
                      orci luctus et ultrices posuere cubilia Curae; In sapien
                      odio, hendrerit a iaculis ut, venenatis in ligula.
                      Vestibulum suscipit egestas augue, nec mattis est mollis
                      et. Curabitur id eleifend leo. Fusce tempor efficitur
                      commodo.
                    </Card.Content>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam facilisis molestie magna vitae pellentesque. Ut
                      elementum accumsan nibh, ut faucibus velit. Vestibulum at
                      mollis justo. Vestibulum ante ipsum primis in faucibus
                      orci luctus et ultrices posuere cubilia Curae; In sapien
                      odio, hendrerit a iaculis ut, venenatis in ligula.
                      Vestibulum suscipit egestas augue, nec mattis est mollis
                      et. Curabitur id eleifend leo. Fusce tempor efficitur
                      commodo.
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Page.Content>
        </Page>
      </ExamplePageContainer>
    );
  }

  renderHeader() {
    const ActionBar = () => {
      return (
        <Box>
          <Box>
            <PopoverMenu
              buttonTheme="icon-greybackground"
              placement="bottom"
              size="normal"
              appendToParent
              zIndex={1}
            >
              <PopoverMenuItem onClick={() => {}} text="Refresh" />
              <PopoverMenuItem onClick={() => {}} text="Trash" />
            </PopoverMenu>
          </Box>
          <Box marginLeft="small" marginRight="small">
            <Button skin="light">Cancel</Button>
          </Box>
          <Box>
            <Button>Save</Button>
          </Box>
        </Box>
      );
    };

    return (
      <Page.Header
        title="Page Title"
        breadcrumbs={
          <Breadcrumbs
            items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
            activeId="3"
            size="medium"
            theme="onGrayBackground"
            onClick={() => {}}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }
}

const ExamplePageContainer = ({ children }) => (
  <div style={{ height: '372px' }}>{children}</div>
);

export default Example;
