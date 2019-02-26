import React from 'react';
import Tag from './Tag';
import tagPrivateDriverFactory from './Tag.private.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { SIZES, WEIGHTS } from '../Text/constants';

describe('Tag', () => {
  const createDriver = createDriverFactory(tagPrivateDriverFactory);
  const id = 'myId';
  const label = 'Hey';

  describe('size', () => {
    it('should have a default small size', () => {
      const driver = createDriver(<Tag id={id}>{label}</Tag>);
      expect(driver.isSmall()).toBeTruthy();
    });

    it('should have a tiny size', () => {
      const driver = createDriver(
        <Tag id={id} size="tiny">
          {label}
        </Tag>,
      );
      expect(driver.isTiny()).toBeTruthy();
      expect(driver.isCloseButtonSmall()).toBeTruthy();
      expect(driver.getTextSize()).toBe(SIZES.tiny);
      expect(driver.getTextWeight()).toBe(WEIGHTS.thin);
    });

    it('should have a small size', () => {
      const driver = createDriver(
        <Tag id={id} size="small">
          {label}
        </Tag>,
      );
      expect(driver.isSmall()).toBeTruthy();
      expect(driver.isCloseButtonSmall()).toBeTruthy();
      expect(driver.getTextSize()).toBe(SIZES.small);
      expect(driver.getTextWeight()).toBe(WEIGHTS.normal);
    });

    it('should have a medium size', () => {
      const driver = createDriver(
        <Tag id={id} size="medium">
          {label}
        </Tag>,
      );
      expect(driver.isMedium()).toBeTruthy();
      expect(driver.isCloseButtonSmall()).toBeTruthy();
      expect(driver.getTextSize()).toBe(SIZES.small);
      expect(driver.getTextWeight()).toBe(WEIGHTS.normal);
    });

    it('should have a large size', () => {
      const driver = createDriver(
        <Tag id={id} size="large">
          {label}
        </Tag>,
      );
      expect(driver.isLarge()).toBeTruthy();
      expect(driver.getTextSize()).toBe(SIZES.medium);
      expect(driver.getTextWeight()).toBe(WEIGHTS.normal);
    });
  });

  it('should have a label', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.getLabel()).toBe(label);
  });

  it('should be removable by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isRemovable()).toBeTruthy();
  });

  it('should not be removable', () => {
    const driver = createDriver(
      <Tag id={id} removable={false}>
        {label}
      </Tag>,
    );
    expect(driver.isRemovable()).toBeFalsy();
  });

  it('should have not remove button if disabled is true', () => {
    const driver = createDriver(
      <Tag id={id} disabled>
        {label}
      </Tag>,
    );
    expect(driver.isRemovable()).toBeFalsy();
  });

  it('should have disabled class if disabled is true', () => {
    const driver = createDriver(
      <Tag id={id} disabled>
        {label}
      </Tag>,
    );
    expect(driver.isDisabled()).toBeTruthy();
  });

  it('should call onRemove function on remove', () => {
    const onRemove = jest.fn();
    const onClick = jest.fn();

    const driver = createDriver(
      <Tag id={id} onRemove={onRemove} onClick={onClick}>
        {label}
      </Tag>,
    );
    driver.removeTag();
    expect(onRemove).toBeCalledWith(id);
    expect(onClick).not.toBeCalled();
  });

  it('should call onClick function on click', () => {
    const onClick = jest.fn();
    const driver = createDriver(
      <Tag id={id} onClick={onClick}>
        {label}
      </Tag>,
    );

    driver.click();
    expect(onClick).toBeCalledWith(id);
  });

  it('should not have pointer cursor when not passed onClick', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isClickable()).toBeFalsy();
  });

  it('should have pointer cursor when passed onClick', () => {
    const driver = createDriver(
      <Tag id={id} onClick={jest.fn()}>
        {label}
      </Tag>,
    );
    expect(driver.isClickable()).toBeTruthy();
  });

  it('should not display thumb by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isThumbExists()).toBeFalsy();
  });

  it('should display thumb', () => {
    const driver = createDriver(
      <Tag id={id} thumb={<span>Ho</span>}>
        {label}
      </Tag>,
    );
    expect(driver.isThumbExists()).toBeTruthy();
  });

  describe('theme attribute', () => {
    it('should have standard theme by default', () => {
      const driver = createDriver(<Tag id={id}>a</Tag>);
      expect(driver.isStandardTheme()).toBe(true);
    });

    it('should have warning theme', () => {
      const driver = createDriver(
        <Tag id={id} theme="warning">
          a
        </Tag>,
      );
      expect(driver.isWarningTheme()).toBe(true);
    });

    it('should have error theme', () => {
      const driver = createDriver(
        <Tag id={id} theme="error">
          a
        </Tag>,
      );
      expect(driver.isErrorTheme()).toBe(true);
    });
  });
});
