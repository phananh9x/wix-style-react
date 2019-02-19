import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.scss';
import ChevronLeftLarge from '../new-icons/ChevronLeftLarge';
import ChevronRightLarge from '../new-icons/ChevronRightLarge';
import IconButton from '../IconButton/IconButton';
import Pagination from './Pagination';
import Loader from '../Loader';
import Proportion from '../Proportion';

const AUTOPLAY_SPEED = 2000;
const TRANSITION_SPEED = 600;

// because lodash throttle is not compatible with jest timeout mocks
function throttle(callback, time) {
  let pause;

  return function(...args) {
    if (!pause) {
      pause = true;
      setTimeout(() => {
        pause = false;
      }, time);
      callback(...args);
    }
  };
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loadedImageCount: 0,
    };
    this._slide = throttle(this._slide.bind(this), TRANSITION_SPEED);
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this._autoplay();
    }
  }

  componentWillUnmount() {
    if (this.props.autoplay) {
      this._haltAutoplay();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.autoplay && !this.props.autoplay) {
      this._haltAutoplay();
    }

    if (!prevProps.autoplay && this.props.autoplay) {
      this._autoplay();
    }
  }

  _autoplay() {
    const intervalToken = setInterval(
      () => this._slide(this._getNextIndex()),
      AUTOPLAY_SPEED,
    );
    this._haltAutoplay = () => clearInterval(intervalToken);
  }

  _stopSlideshow() {
    this.props.autoplay && this._haltAutoplay();
  }

  _continueSlideshow() {
    this.props.autoplay && this._autoplay();
  }

  _isLastImage() {
    return this.state.activeIndex === this.props.images.length - 1;
  }

  _slide(index) {
    this.setState({
      activeIndex: index,
    });
  }

  _prev() {
    if (this.state.activeIndex === 0 && !this.props.infinite) {
      return;
    }
    this._slide(this._getPrevIndex());
  }

  _next() {
    if (this._isLastImage() && !this.props.infinite) {
      return;
    }
    this._slide(this._getNextIndex());
  }

  _getNextIndex() {
    return this.state.activeIndex === this.props.images.length - 1
      ? 0
      : this.state.activeIndex + 1;
  }

  _getPrevIndex() {
    return this.state.activeIndex === 0
      ? this.props.images.length - 1
      : this.state.activeIndex - 1;
  }

  _onImageLoad() {
    this.setState(state => {
      const loadedImageCount = state.loadedImageCount + 1;
      return {
        loadedImageCount,
      };
    });
  }

  _isLoading() {
    return this.state.loadedImageCount < this.props.images.length;
  }

  _getActivePage() {
    const activeIndex = this.state.activeIndex;
    const originalImageCount = this.props.images.length;
    return activeIndex % originalImageCount;
  }

  render() {
    const prevButton = (
      <div className={styles.buttonContainer}>
        <IconButton
          dataHook="prev-button"
          priority="secondary"
          onClick={() => this._prev()}
        >
          <ChevronLeftLarge />
        </IconButton>
      </div>
    );

    const nextButton = (
      <div className={styles.buttonContainer}>
        <IconButton
          dataHook="next-button"
          priority="secondary"
          onClick={() => this._next()}
        >
          <ChevronRightLarge />
        </IconButton>
      </div>
    );

    return (
      <div
        className={styles.carousel}
        data-hook={this.props.dataHook}
        data-ready={!this._isLoading()}
      >
        <div className={styles.imagesAndButtonsContainer}>
          <div className={styles.gallery}>
            {prevButton}
            <Proportion
              aspectRatio={Proportion.PREDEFINED_RATIOS.landscape}
              className={styles.imagesContainerLayout}
            >
              <div
                data-hook="images-container"
                className={styles.imagesContainer}
                data-is-loading={this._isLoading()}
                onMouseOver={() => this._stopSlideshow()}
                onMouseOut={() => this._continueSlideshow()}
              >
                {this.props.images.map((image, currentIndex) => {
                  return (
                    <div
                      key={currentIndex}
                      className={classNames(styles.imageContainer, {
                        [styles.active]:
                          currentIndex === this.state.activeIndex,
                        [styles.prev]: currentIndex === this._getPrevIndex(),
                        [styles.next]: currentIndex === this._getNextIndex(),
                      })}
                    >
                      <img
                        className={styles.image}
                        data-hook="carousel-img"
                        src={image.src}
                        onLoad={() => this._onImageLoad()}
                      />
                    </div>
                  );
                })}
              </div>
              {this._isLoading() ? (
                <div className={styles.loader}>
                  <Loader dataHook="loader" size="small" />
                </div>
              ) : null}
            </Proportion>
            {nextButton}
          </div>
          <Pagination
            className={styles.paginationLayout}
            totalPages={this.props.images.length}
            currentPage={this._getActivePage()}
          />
        </div>
      </div>
    );
  }
}

//update images on imageUpdate
Carousel.propTypes = {
  dataHook: PropTypes.string,
  /** Array of strings where each string is a src of an image (in \<img src="your_src" /\>) */
  images: PropTypes.array.isRequired,
  /** Images loop endlessly */
  infinite: PropTypes.bool,
  /** Auto-playing of images */
  autoplay: PropTypes.bool,
};

Carousel.defaultProps = {
  infinite: true,
  images: [],
};
Carousel.displayName = 'Carousel';

export default Carousel;
