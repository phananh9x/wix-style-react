/* eslint-disable no-console */
import React from 'react';
import Page from './Page';
import pageDriverFactory from './Page.driver';
import { PagePrivateDriver } from './Page.private.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

const Content = () => <div>content</div>;

const Tail = () => <div>tail</div>;

const renderPageWithProps = (props = {}) => (
  <Page {...props}>
    <Page.Header title="title" />
    <Page.Content>
      <Content />
    </Page.Content>
  </Page>
);

describe('Page', () => {
  const createDriver = createDriverFactory(pageDriverFactory);

  it('should initialize component', () => {
    const driver = createDriver(renderPageWithProps());
    expect(driver.exists()).toBeTruthy();
  });

  describe('backgroundImage', () => {
    it('should initialize component with background image', () => {
      const driver = createDriver(
        renderPageWithProps({ backgroundImageUrl: '/some/image' }),
      );
      expect(driver.backgroundImageExists()).toBeTruthy();
    });

    it('should not initialize component with background image', () => {
      const driver = createDriver(renderPageWithProps());
      expect(driver.backgroundImageExists()).toBeFalsy();
    });
  });

  describe('customClassName', () => {
    it('should have custom className', () => {
      const driver = createDriver(
        renderPageWithProps({ className: 'myClass' }),
      );
      expect(driver.hasClass('myClass')).toBeTruthy();
    });
  });

  describe('gradientClassName', () => {
    it('should initialize component with gradient class name', () => {
      const driver = createDriver(
        renderPageWithProps({ gradientClassName: 'class' }),
      );
      expect(driver.gradientClassNameExists()).toBeTruthy();
    });

    it('should not initialize component with gradiet class name by default', () => {
      const driver = createDriver(renderPageWithProps());
      expect(driver.gradientClassNameExists()).toBeFalsy();
    });
  });

  describe('gradient size', () => {
    it('should be 36px by default', () => {
      const driver = createDriver(
        renderPageWithProps({ gradientClassName: 'class' }),
      );
      expect(driver.gradientContainerHeight()).toBe('36px');
    });

    it('should not render 0 when maximized but header height delta is 0', () => {
      const driver = createDriver(renderPageWithProps());
      expect(driver.getPageHtml()).not.toContain('>0<');
    });

    it('should be zero when Tail exist and gradientCoverTail is false', () => {
      const props = { gradientClassName: 'class', gradientCoverTail: false };
      const driver = createDriver(
        <Page {...props}>
          <Page.Header />
          <Page.Tail>
            <Tail />
          </Page.Tail>
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>,
      );
      expect(driver.gradientContainerHeight()).toBe('0px');
    });
  });

  describe('Page.Tail', () => {
    it('should attach a tail component', () => {
      const driver = createDriver(
        <Page>
          <Page.Header title="title" />
          <Page.Tail>
            <Tail />
          </Page.Tail>
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>,
      );

      expect(driver.tailExists()).toBeTruthy();
    });

    it('should not attach a tail component', () => {
      const driver = createDriver(renderPageWithProps());
      expect(driver.tailExists()).toBeFalsy();
    });
  });

  describe('Scroll Header', () => {
    it('should scroll ScrollableContent when getting wheel event on Header', () => {
      const driver = PagePrivateDriver.fromJsxElement(
        <Page>
          <Page.Header title="title" />
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>,
      );
      expect(driver.getScrollAmount()).toBe(0);
      driver.wheelOnFixedContainer(10);
      expect(driver.getScrollAmount()).toBe(10);
    });
  });

  describe('DOM calculations', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    xit('should recalculate component heights when rerendered', () => {
      // TODO:
    });
  });
  describe('Header layer', () => {
    it('should NOT block clicks on content close to header', () => {});
    it('should NOT block clicks on content close to header when MiniHeader appears', () => {});
  });

  describe('Prop Validation', () => {
    const stub = (console.error = jest.fn());
    const prefixWarning = 'Warning: Failed prop type: ';
    const suffixWarning = '\n    in Page';

    beforeEach(() => {
      require('react');
    });

    afterEach(() => {
      jest.resetModules();
      stub.mockReset();
    });

    it('should not initialize without a PageContent component', () => {
      const page = (
        <Page>
          <Page.Header title="title" />
          <div />
        </Page>
      );

      createDriver(page);
      expect(stub).toHaveBeenCalledWith(
        expect.stringContaining(
          `${prefixWarning}Page: Invalid Prop children, must contain Page.Content${suffixWarning}`,
        ),
      );
    });

    it('should not initialize without a PageHeader component', () => {
      const page = (
        <Page>
          <Page.Content>
            <div />
          </Page.Content>
          <div />
        </Page>
      );

      createDriver(page);
      expect(stub).toHaveBeenCalledWith(
        expect.stringContaining(
          `${prefixWarning}Page: Invalid Prop children, must contain Page.Header${suffixWarning}`,
        ),
      );
    });

    it('should not initialize component with an unknown type', () => {
      const page = (
        <Page>
          <Page.Header title="title" />
          <Page.Content>
            <div />
          </Page.Content>
          <div>Unwanted child</div>
        </Page>
      );

      createDriver(page);
      expect(stub).toHaveBeenCalledWith(
        expect.stringContaining(
          `${prefixWarning}Page: Invalid Prop children, unknown child div${suffixWarning}`,
        ),
      );
    });
  });
});
