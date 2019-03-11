import { modalDriverFactory as publicDriverFactory } from './Modal.uni.driver';

export const modalPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),
    // Add here driver methods that considered "private"
  };
};
