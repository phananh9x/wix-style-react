import React from 'react';
import { TooltipContainerStrategy } from './TooltipContainerStrategy';
import { mount } from 'enzyme';
import Page from '../Page';

describe('TooltipContainerStrategy', () => {
  it('should return body when element is null', () => {
    const tooltipContainerStrategy = new TooltipContainerStrategy(null, false);
    const container = tooltipContainerStrategy.getContainer(null);
    expect(container).toBe(document.body);
  });

  it('should return body when no other parent is given', () => {
    const tooltipContainerStrategy = new TooltipContainerStrategy(null, false);
    const element = document.createElement('div');
    const container = tooltipContainerStrategy.getContainer(element);
    expect(container).toBe(document.body);
  });

  it('should return element parent when appendToParent is true', () => {
    const tooltipContainerStrategy = new TooltipContainerStrategy(null, true);
    const parent = document.createElement('div');
    const element = document.createElement('div');
    parent.appendChild(element);
    const container = tooltipContainerStrategy.getContainer(element);
    expect(container).toBe(parent);
  });

  it('should return matching ancestor by predicate when appendByPredicate has a value', () => {
    const tooltipContainerStrategy = new TooltipContainerStrategy(
      null,
      null,
      el => el.getAttribute('some-attr') === 'some-value',
    );
    const ancestor = document.createElement('div');
    ancestor.setAttribute('some-attr', 'some-value');
    const parent = document.createElement('div');
    ancestor.appendChild(parent);
    const element = document.createElement('div');
    parent.appendChild(element);
    const container = tooltipContainerStrategy.getContainer(element);
    expect(container).toBe(ancestor);
  });

  it('should return appendTo element when provided and appendToParent is true', () => {
    const appendToElement = document.createElement('div');
    const tooltipContainerStrategy = new TooltipContainerStrategy(
      appendToElement,
      true,
    );
    const parent = document.createElement('div');
    const element = document.createElement('div');
    parent.appendChild(element);
    const container = tooltipContainerStrategy.getContainer(element);
    expect(container).toBe(appendToElement);
  });

  it('should return appendTo element when provided', () => {
    const parent = document.createElement('div');
    const tooltipContainerStrategy = new TooltipContainerStrategy(
      parent,
      false,
    );
    const element = document.createElement('div');
    const container = tooltipContainerStrategy.getContainer(element);
    expect(container).toBe(parent);
  });

  it('should return Page scrollable container when element is rendered inside a Page', () => {
    const tooltipContainerStrategy = new TooltipContainerStrategy(null, false);
    let element;

    mount(
      <Page>
        <Page.Header title="title" />
        <Page.Content>
          <div ref={ref => (element = ref)} />
        </Page.Content>
      </Page>,
    );

    const container = tooltipContainerStrategy.getContainer(element);
    expect(container.getAttribute('data-class')).toBe(
      'page-scrollable-content',
    );
  });
});
