import ReactTestUtils from 'react-dom/test-utils';

const sliderDriverFactory = ({ element }) => {
  const $sliderHandles = () =>
    element.querySelectorAll('[data-hook="slider-handle"]');
  const $sliderDots = () => element.querySelectorAll('.rc-slider-dot');

  return {
    /** returns true if element in the DOM */
    exists: () => !!element,
    /** returns true if slider grade is selected */
    isDotSelected: number =>
      $sliderDots()
        .item(number - 1)
        .classList.contains('rc-slider-dot-active'),
    /** returns number of slider grades */
    numOfSliderDots: () => $sliderDots().length,
    /** returns number of slider handles */
    numOfSliderHandles: () => $sliderHandles().length,
    /** returns slider tooltip value */
    getToolTipValue: () => {
      const tooltip = element.querySelector('[data-hook="slider-tooltip"]');
      return tooltip && tooltip.innerHTML;
    },
    /** hovers on slider handle */
    hoverHandle: ({ handleIndex }) => {
      const handle = $sliderHandles()[handleIndex];
      ReactTestUtils.Simulate.mouseEnter(handle);
    },
    /** mouse leaves slider handle */
    unHoverHandle: ({ handleIndex }) => {
      const handle = $sliderHandles()[handleIndex];
      ReactTestUtils.Simulate.mouseLeave(handle);
    },
  };
};

export default sliderDriverFactory;
