import React from 'react';
import Page from 'wix-style-react/Page';
import { Breadcrumbs } from 'wix-style-react/Breadcrumbs';
import Button from 'wix-style-react/Button';
import { Row, Col, Container } from 'wix-style-react/Grid';
import CardGalleryItem from 'wix-style-react/CardGalleryItem';

class ExampleSplitLayout extends React.Component {
  renderHeader() {
    const ActionBar = () => {
      return <Button>Save</Button>;
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

  renderCardGalleryItem() {
    const backgroundImageUrl =
      'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_343,h_343,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg';

    return (
      <CardGalleryItem
        title={'Card Title'}
        subtitle={'Card subtitle'}
        primaryActionProps={{
          label: 'Button',
          onClick: () => {
            alert('Primary action clicked');
          },
        }}
        secondaryActionProps={{
          label: 'Text link',
          onClick: () => {
            alert('Secondary action clicked');
          },
        }}
        backgroundImageUrl={backgroundImageUrl}
        data-hook="storybook-card-gallery-item"
      />
    );
  }

  render() {
    const ExamplePageContainer = ({ children }) => (
      <div style={{ height: '372px' }}>{children}</div>
    );

    return (
      <ExamplePageContainer>
        <Page upgrade>
          {this.renderHeader()}
          <Page.Content>
            <Container>
              {Array(2).fill(
                <Row>
                  {Array(3).fill(
                    <Col span={4}>{this.renderCardGalleryItem()}</Col>,
                  )}
                </Row>,
              )}
            </Container>
          </Page.Content>
        </Page>
      </ExamplePageContainer>
    );
  }
}

export default ExampleSplitLayout;
