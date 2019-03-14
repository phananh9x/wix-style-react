import React from 'react';

import { createRendererWithUniDriver, cleanup } from '../../test/utils/react';
import { closeButtonPrivateDriverFactory } from './CloseButton.driver.private';
import CloseButton from '.';
import Add from 'wix-ui-icons-common/Add';

describe('CloseButton', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(closeButtonPrivateDriverFactory);

  it('should have correct displayName', async () => {
    expect(CloseButton.displayName).toEqual('CloseButton');
  });

  describe('Icon', () => {
    it('when given small or none should have size <Close/>', async () => {
      const { driver } = render(<CloseButton size="small" />);
      expect(await driver.closeIconExists()).toBe(true);
    });

    it('when given medium should have size <CloseLarge />', async () => {
      const { driver } = render(<CloseButton size="medium" />);
      expect(await driver.largeCloseIconExists()).toBe(true);
    });
  });

  describe('Custom icon', () => {
    const dataHook = 'children-icon';

    it('when given small or none should have 18px icon', async () => {
      const { driver } = render(
        <CloseButton size="small">
          <Add data-hook={dataHook} />
        </CloseButton>,
      );
      expect(await driver.customIconSize()).toEqual('18px');
    });

    it('when given medium should have 18px icon', async () => {
      const { driver } = render(
        <CloseButton size="medium">
          <Add data-hook={dataHook} />
        </CloseButton>,
      );
      expect(await driver.customIconSize()).toEqual('18px');
    });
  });

  describe(`'as' prop`, () => {
    const Link = ({ children }) => <a>{children}</a>;

    class LinkClass extends React.Component {
      render() {
        return <a>{this.props.children}</a>;
      }
    }

    it('should be defined in proptypes', async () => {
      expect(!!CloseButton.propTypes.as).toBe(true);
    });

    it('should render without errors when html element is passed', async () => {
      const { driver } = render(<CloseButton as="a" />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when function reference is passed', async () => {
      const { driver } = render(<CloseButton as={Link} />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when class is passed', async () => {
      const { driver } = render(<CloseButton as={LinkClass} />);
      expect(await driver.exists()).toBe(true);
    });
  });
});
