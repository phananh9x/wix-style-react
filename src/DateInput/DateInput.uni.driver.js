import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { testkit as inputTestKit } from '../Input/Input.uni.driver';

export const dateInputDriverFactory = base => {
  // TODO - replace this when uniDriver support is added to input
  return {
    ...baseUniDriverFactory(base),
    ...inputTestKit(base),
  };
};
