import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';

import { Breadcrumbs } from 'wix-style-react/Breadcrumbs';
import Box from 'wix-style-react/Box';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';
import { Row, Col, Container } from 'wix-style-react/Grid';

class ExampleGeneralLayout extends React.Component {
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

  render() {
    const ExamplePageContainer = ({ children }) => (
      <div style={{ height: '372px' }}>{children}</div>
    );
    const ExampleContent = () => <div style={{ height: '550px' }} />;

    return (
      <ExamplePageContainer>
        <Page upgrade>
          {this.renderHeader()}
          <Page.Content>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Header title="Card Title" />
                    <Card.Content>
                      <ExampleContent />
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
}

export default ExampleGeneralLayout;
