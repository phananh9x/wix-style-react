import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../test/utils/react';
import { textButtonDriverFactory } from './TextButton.driver';
import TextButton from '.';

describe('TextButton', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(textButtonDriverFactory);

  it('should have correct displayName', async () => {
    expect(TextButton.displayName).toEqual('TextButton');
  });

  describe(`'as' prop`, () => {
    const Link = ({ children }) => <a>{children}</a>;

    class LinkClass extends React.Component {
      render() {
        return <a>{this.props.children}</a>;
      }
    }

    it('should be defined in proptypes', async () => {
      expect(!!TextButton.propTypes.as).toBe(true);
    });

    it('should render without errors when html element is passed', async () => {
      const { driver } = render(<TextButton as="a" />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when function reference is passed', async () => {
      const { driver } = render(<TextButton as={Link} />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when class is passed', async () => {
      const { driver } = render(<TextButton as={LinkClass} />);
      expect(await driver.exists()).toBe(true);
    });
  });
});
