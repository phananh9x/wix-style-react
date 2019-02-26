import ReactTestUtils from 'react-dom/test-utils';
import { carouselDriverFactory as publicDriver } from './Carousel.driver';

export default ({ element }) => {
  return {
    ...publicDriver({ element }),
    getCurrentImageIndex: () => {
      const imageContainers = element.querySelectorAll('.imageContainer');
      for (let i = 0; i < imageContainers.length; i++) {
        if (imageContainers[i].classList.contains('active')) return i;
      }
    },
    loadImages: () => {
      element
        .querySelectorAll('[data-hook="carousel-img"]')
        .forEach(img => ReactTestUtils.Simulate.load(img));
    },
    clickPrevious: () => {
      const prevButton = element.querySelector('[data-hook="prev-button"]');
      ReactTestUtils.Simulate.click(prevButton);
    },
    clickNext: () => {
      const nextButton = element.querySelector('[data-hook="next-button"]');
      ReactTestUtils.Simulate.click(nextButton);
    },
    mouseOver: () => {
      const imageContainer = element.querySelector(
        '[data-hook="images-container"]',
      );
      ReactTestUtils.Simulate.mouseOver(imageContainer);
    },
    mouseOut: () => {
      const imageContainer = element.querySelector(
        '[data-hook="images-container"]',
      );
      ReactTestUtils.Simulate.mouseOut(imageContainer);
    },
  };
};
