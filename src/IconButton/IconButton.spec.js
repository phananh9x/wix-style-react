import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../test/utils/react';
import { iconButtonPrivateDriverFactory } from './IconButton.driver.private';
import IconButton from '.';

import Add from 'wix-ui-icons-common/Add';

describe('IconButton', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(iconButtonPrivateDriverFactory);

  it('should have correct displayName', () => {
    expect(IconButton.displayName).toEqual('IconButton');
  });

  describe('Icon size', () => {
    const dataHook = 'iconbutton-icon';

    it('should have size 24px', async () => {
      const { driver } = render(
        <IconButton as="a">
          <Add data-hook={dataHook} />
        </IconButton>,
      );

      expect(await driver.getIconSize()).toEqual('24px');
    });

    it('given size small should have size 18px', async () => {
      const { driver } = render(
        <IconButton size="small">
          <Add data-hook={dataHook} />
        </IconButton>,
      );
      expect(await driver.getIconSize()).toEqual('18px');
    });

    describe(`'as' prop`, () => {
      const Link = ({ children }) => <a>{children}</a>;

      class LinkClass extends React.Component {
        render() {
          return <a>{this.props.children}</a>;
        }
      }

      it('should be defined in proptypes', async () => {
        expect(!!IconButton.propTypes.as).toBe(true);
      });

      it('should render without errors when html element is passed', async () => {
        const { driver } = render(<IconButton as="a" />);
        expect(await driver.exists()).toBe(true);
      });

      it('should render without errors when function reference is passed', async () => {
        const { driver } = render(<IconButton as={Link} />);
        expect(await driver.exists()).toBe(true);
      });

      it('should render without errors when class is passed', async () => {
        const { driver } = render(<IconButton as={LinkClass} />);
        expect(await driver.exists()).toBe(true);
      });
    });
  });
});
