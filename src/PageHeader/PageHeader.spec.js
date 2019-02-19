import React from 'react';
import PageHeader from './PageHeader';
import pageHeaderDriverFactory from './PageHeader.driver';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import Button from '../Button';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PropTypes from 'prop-types';

const generateBreadcrumbs = title => (
  <Breadcrumbs
    items={[{ id: '1', value: title }]}
    activeId="1"
    size="medium"
    theme="onGrayBackground"
    onClick={() => {}}
  />
);

const ActionBar = props => props.children;

describe('PageHeader', () => {
  const title = 'This is a title';
  const subtitle = 'This is a subtitle';
  const breadcrumbs = generateBreadcrumbs(title);
  const actionsBar = (
    <ActionBar>
      <Button>Action</Button>
    </ActionBar>
  );
  const onBackClicked = () => {};
  const render = createRendererWithDriver(pageHeaderDriverFactory);
  const createDriver = jsx => render(jsx).driver;

  afterEach(() => {
    cleanup();
  });

  it('should initialize component with title', () => {
    const pageHeader = <PageHeader title={title} />;
    const driver = createDriver(pageHeader);
    expect(driver.titleText()).toBe(title);
    expect(driver.isTitleExists()).toBeTruthy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeFalsy();
  });

  it('should initialize component with minimized title', () => {
    const pageHeader = <PageHeader minimized title={title} />;
    const driver = createDriver(pageHeader);
    expect(driver.isTitleExists()).toBeFalsy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with title and subtitle', () => {
    const pageHeader = <PageHeader title={title} subtitle={subtitle} />;
    const driver = createDriver(pageHeader);
    expect(driver.titleText()).toBe(title);
    expect(driver.subtitleText()).toBe(subtitle);
    expect(driver.isTitleExists()).toBeTruthy();
    expect(driver.isSubtitleExists()).toBeTruthy();
    expect(driver.isBreadcrumbsExists()).toBeFalsy();
  });

  it('should initialize component with title and subtitle with a special character', () => {
    const someTextWithSpecialCharachters = 'tom & jerry';
    const pageHeader = (
      <PageHeader
        title={someTextWithSpecialCharachters}
        subtitle={someTextWithSpecialCharachters}
      />
    );
    const driver = createDriver(pageHeader);
    expect(driver.titleText()).toEqual(someTextWithSpecialCharachters);
    expect(driver.subtitleText()).toEqual(someTextWithSpecialCharachters);
  });

  it('should initialize component with minimized title and subtitle', () => {
    const pageHeader = (
      <PageHeader minimized title={title} subtitle={subtitle} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isTitleExists()).toBeFalsy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with breadcrumbs and title', () => {
    const pageHeader = <PageHeader breadcrumbs={breadcrumbs} title={title} />;
    const driver = createDriver(pageHeader);
    expect(driver.titleText()).toBe(title);
    expect(driver.isTitleExists()).toBeTruthy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with minimized breadcrumbs and title', () => {
    const pageHeader = (
      <PageHeader minimized breadcrumbs={breadcrumbs} title={title} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isTitleExists()).toBeFalsy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with breadcrumbs, title and subtitle', () => {
    const pageHeader = (
      <PageHeader breadcrumbs={breadcrumbs} title={title} subtitle={subtitle} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.titleText()).toBe(title);
    expect(driver.subtitleText()).toBe(subtitle);
    expect(driver.isTitleExists()).toBeTruthy();
    expect(driver.isSubtitleExists()).toBeTruthy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with minimized breadcrumbs, title and subtitle', () => {
    const pageHeader = (
      <PageHeader
        minimized
        breadcrumbs={breadcrumbs}
        title={title}
        subtitle={subtitle}
      />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isTitleExists()).toBeFalsy();
    expect(driver.isSubtitleExists()).toBeFalsy();
    expect(driver.isBreadcrumbsExists()).toBeTruthy();
  });

  it('should initialize component with title and actionsBar', () => {
    const pageHeader = <PageHeader title={title} actionsBar={actionsBar} />;
    const driver = createDriver(pageHeader);
    expect(driver.isActionBarExists()).toBeTruthy();
  });

  it('should initialize component with minimized title and actionsBar', () => {
    const pageHeader = (
      <PageHeader minimized title={title} actionsBar={actionsBar} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isActionBarExists()).toBeTruthy();
  });

  it('should initialize component with title and back button without callback', () => {
    const pageHeader = <PageHeader title={title} showBackButton />;
    const driver = createDriver(pageHeader);
    expect(driver.isBackButtonExists()).toBeFalsy();
  });

  it('should initialize component with title and back button callback', () => {
    const pageHeader = (
      <PageHeader title={title} onBackClicked={onBackClicked} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isBackButtonExists()).toBeFalsy();
  });

  it('should initialize component with title and back button callback and back button', () => {
    const pageHeader = (
      <PageHeader title={title} showBackButton onBackClicked={onBackClicked} />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isBackButtonExists()).toBeTruthy();
  });

  it('should initialize component with minimized title and back button callback and back button', () => {
    const pageHeader = (
      <PageHeader
        minimized
        title={title}
        showBackButton
        onBackClicked={onBackClicked}
      />
    );
    const driver = createDriver(pageHeader);
    expect(driver.isBackButtonExists()).toBeFalsy();
  });

  it('should execute the given back button callback once the back button is clicked', () => {
    const backButtonCallback = jest.fn();
    const pageHeader = (
      <PageHeader
        title={title}
        showBackButton
        onBackClicked={backButtonCallback}
      />
    );
    const driver = createDriver(pageHeader);
    driver.clickBackButton();

    expect(backButtonCallback).toBeCalledTimes(1);
  });

  it('should have custom className', () => {
    const pageHeader = <PageHeader title={title} className="myClass" />;
    const driver = createDriver(pageHeader);
    expect(driver.hasClass('myClass')).toBeTruthy();
  });

  describe('should initialize component with render props title', () => {
    const altTitle = 'This is a different title';
    const HeaderTitleComponent = props => (
      <span>{props.minimized ? altTitle : title}</span>
    );
    HeaderTitleComponent.propTypes = { minimized: PropTypes.bool };

    it('not minimized', () => {
      const pageHeader = (
        <PageHeader
          title={minimized => <HeaderTitleComponent minimized={minimized} />}
        />
      );
      const driver = createDriver(pageHeader);
      expect(driver.titleText()).toBe(title);
      expect(driver.isTitleExists()).toBeTruthy();
      expect(driver.isSubtitleExists()).toBeFalsy();
      expect(driver.isBreadcrumbsExists()).toBeFalsy();
    });

    it('minimized with breadcrumbs', () => {
      const pageHeader = (
        <PageHeader
          minimized
          breadcrumbs={breadcrumbs}
          title={minimized => <HeaderTitleComponent minimized={minimized} />}
        />
      );
      const driver = createDriver(pageHeader);
      expect(driver.isTitleExists()).toBeFalsy();
      expect(driver.isSubtitleExists()).toBeFalsy();
      expect(driver.isBreadcrumbsExists()).toBeTruthy();
    });

    it('minimized without breadcrumbs', () => {
      const pageHeader = (
        <PageHeader
          minimized
          title={minimized => <HeaderTitleComponent minimized={minimized} />}
        />
      );
      const driver = createDriver(pageHeader);
      expect(driver.isTitleExists()).toBeFalsy();
      expect(driver.isSubtitleExists()).toBeFalsy();
      expect(driver.isBreadcrumbsExists()).toBeTruthy();
      expect(driver.breadcrumbsText()).toBe(altTitle);
    });
  });
});
