import React from 'react';
import CloseButton from '.';
import { shallow } from 'enzyme';
import Add from 'wix-ui-icons-common/Add';

describe('CloseButton', () => {
  it('should have correct displayName', async () => {
    expect(CloseButton.displayName).toEqual('CloseButton');
  });

  describe('Icon', () => {
    it('when given small or none should have size <Close/>', () => {
      const wrapper = shallow(<CloseButton size="small" />);
      expect(wrapper.find('[data-hook="close"]').exists()).toBeTruthy();
    });

    it('when given medium should have size <CloseLarge />', () => {
      const wrapper = shallow(<CloseButton size="medium" />);
      expect(wrapper.find('[data-hook="close-large"]').exists()).toBeTruthy();
    });
  });

  describe('Custom icon', () => {
    const dataHook = 'children-icon';
    const selector = `[data-hook='${dataHook}']`;

    it('when given small or none should have 18px icon', () => {
      const wrapper = shallow(
        <CloseButton size="small">
          <Add data-hook={dataHook} />
        </CloseButton>,
      );
      expect(wrapper.find(selector).props().size).toEqual('18px');
    });

    it('when given medium should have 18px icon', () => {
      const wrapper = shallow(
        <CloseButton size="medium">
          <Add data-hook={dataHook} />
        </CloseButton>,
      );
      expect(wrapper.find(selector).props().size).toEqual('18px');
    });
  });
});
