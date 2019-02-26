import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Thumbnail from './Thumbnail';
import { thumbnailPrivateDriverFactory } from './Thumbnail.private.driver';

const createDriver = createUniDriverFactory(thumbnailPrivateDriverFactory);

describe('Thumbnail', () => {
  it('should allow adding title', async () => {
    const title = 'I am a title';
    const driver = createDriver(<Thumbnail title={title} />);
    expect(await driver.getTitle()).toEqual(title);
  });

  it('should allow adding description', async () => {
    const description = 'I am a description';
    const driver = createDriver(<Thumbnail description={description} />);
    expect(await driver.getDescription()).toEqual(description);
  });

  it('should be clickable', async () => {
    const onClick = jest.fn();
    const driver = createDriver(<Thumbnail onClick={onClick} />);
    await driver.click();
    expect(onClick).toHaveBeenCalled();
  });

  describe('keyboard events', () => {
    it('should invoke onClick for spacebar and enter', async () => {
      const onClick = jest.fn();
      const driver = createDriver(<Thumbnail onClick={onClick} />);
      await driver.keyDown(32); // spacebar
      await driver.keyDown(13); // enter
      expect(onClick.mock.calls.length).toEqual(2);
    });
  });

  describe('`image` prop', () => {
    describe('as string', () => {
      it('should use string as <img/> src', async () => {
        const src = 'john.jpg';
        const driver = createDriver(<Thumbnail image={src} />);
        expect(
          await driver
            .getImage()
            .$('img')
            .attr('src'),
        ).toEqual(src);
      });
    });

    describe('as node', () => {
      it('should render that node as is', async () => {
        const image = <div data-hook="image-node">catch me</div>;
        const driver = createDriver(<Thumbnail image={image} />);
        expect(
          await driver
            .getImage()
            .$('[data-hook="image-node"]')
            .text(),
        ).toEqual('catch me');
      });
    });
  });

  describe('`backgroundImage` prop', async () => {
    it('should allow adding backgroundImage as URL', async () => {
      const driver = await createDriver(
        <Thumbnail
          title="title"
          description="description"
          image="image.jpg"
          backgroundImage="john.jpg"
        />,
      );
      expect(await driver.getBackgroundImage().attr('style')).toEqual(
        'background-image: url(john.jpg);',
      );
    });

    it('should disable title, description and image', async () => {
      const driver = await createDriver(
        <Thumbnail
          title="title"
          description="description"
          image="image.jpg"
          backgroundImage="john.jpg"
        />,
      );
      expect(await driver.titleExists()).toEqual(false);
      expect(await driver.descriptionExists()).toEqual(false);
      expect(await driver.imageExists()).toEqual(false);
    });
  });

  describe('`selected` prop', () => {
    it('should render icon when true', async () => {
      const driver = createDriver(<Thumbnail selected />);
      expect(await driver.selectedIconExists()).toEqual(true);
      expect(await driver.isSelected()).toEqual(true);
    });

    it('should not render icon when false', async () => {
      const driver = createDriver(<Thumbnail selected hideSelectedIcon />);
      expect(await driver.getSelectedIcon().exists()).toEqual(false);
    });
  });

  describe('`disabled` prop', () => {
    it('should have disabled state', async () => {
      const driver = createDriver(<Thumbnail disabled />);
      expect(await driver.isDisabled()).toEqual(true);
    });

    it('should not trigger onClick', async () => {
      const onClick = jest.fn();
      const driver = createDriver(<Thumbnail disabled onClick={onClick} />);
      await driver.click();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('`width` & `height` props', () => {
    it('should set width & height', async () => {
      const driver = createDriver(<Thumbnail width={100} height={100} />);
      expect(await driver.getWidth()).toEqual('100px');
      expect(await driver.getHeight()).toEqual('100px');
    });
  });
});
