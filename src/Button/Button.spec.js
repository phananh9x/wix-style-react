import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../test/utils/react';
import { buttonDriverFactory } from './Button.driver';
import Button from '.';

describe('Button', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(buttonDriverFactory);

  it('should have correct displayName', async () => {
    expect(Button.displayName).toEqual('Button');
  });

  describe(`'as' prop`, () => {
    const Link = ({ children }) => <a>{children}</a>;

    class LinkClass extends React.Component {
      render() {
        return <a>{this.props.children}</a>;
      }
    }

    it('should be defined in proptypes', async () => {
      expect(!!Button.propTypes.as).toBe(true);
    });

    it('should render without errors when html element is passed', async () => {
      const { driver } = render(<Button as="a" />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when function reference is passed', async () => {
      const { driver } = render(<Button as={Link} />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when class is passed', async () => {
      const { driver } = render(<Button as={LinkClass} />);
      expect(await driver.exists()).toBe(true);
    });
  });
});
