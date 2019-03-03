import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ResizeSensor } from 'css-element-queries';
import s from './Page.scss';
import WixComponent from '../BaseComponents/WixComponent';
import { PageContext } from './PageContext';
import PageHeader from '../PageHeader';
import Content from './Content';
import Tail from './Tail';
import { PageSticky } from './PageSticky';

import {
  HEADER_BOTTOM_PADDING,
  PAGE_SIDE_PADDING_PX,
  PAGE_BOTTOM_PADDING_PX,
  BACKGROUND_COVER_CONTENT_PX,
} from './constants';
import {
  mainContainerMinWidthPx as GRID_MIN_WIDTH,
  mainContainerMaxWidthPx as GRID_MAX_WIDTH,
} from '../Grid/constants';

/*
 * Page structure is as follows:
 *
 * + PageWrapper --------------------
 * | +- Page ------------------------
 * | | +-- FixedContainer (* invisible by default)
 * | | | +-- HeaderContainer (minimized)
 * | | | |
 * | | | +---------------------------
 * | | +-----------------------------
 * | | +--  ScrollableContainer -----
 * | | | +-- contentWrapper----------
 * | | | | +-- Page.Content ---------
 * | | | | |
 * | | | | +-------------------------
 * | | | +---------------------------
 * | | +-----------------------------
 * | +------------------------------- (Page - End)
 * +--------------------------------- (PageWrapper - End)
 *
 * -  ScrollableContainer has a data-classnamed 'scrollable-content', and should NOT be renamed, since
 * Tooltip is hard-coded-ly using a selector like this: [data-class="page-scrollable-content"]
 * * FixedContainer* - It is hidden by default, and made visible when scroll amount reaches some threshold
 */

/*
 * +-- HeaderContainer ------
 * |  header-content:padding-top
 * | +-- Page.Header --------
 * | |
 * | |
 * | +-----------------------
 * |  tail:padding-top
 * | +-- Page.Tail ----------
 * | |
 * | |
 * | +-----------------------
 * |  header-content:padding-bottom
 * +-------------------------
 */

/**
 * A page container which contains a header and scrollable content
 */
class Page extends WixComponent {
  static defaultProps = {
    gradientCoverTail: true,
    minWidth: GRID_MIN_WIDTH,
    maxWidth: GRID_MAX_WIDTH,
  };

  constructor(props) {
    super(props);

    this._handleScroll = this._handleScroll.bind(this);
    this._handleWidthResize = this._handleWidthResize.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
    this._calculateComponentsHeights = this._calculateComponentsHeights.bind(
      this,
    );

    this.state = {
      headerContainerHeight: 0,
      tailHeight: 0,
      scrollBarWidth: 0,
      displayMiniHeader: false,
      minimizedHeaderContainerHeight: null,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.contentResizeListener = new ResizeSensor(
      this._getScrollContainer().childNodes[0],
      this._handleWidthResize,
    );

    this._calculateComponentsHeights();
    this._handleWidthResize();
    window.addEventListener('resize', this._handleWindowResize);

    // TODO: Hack to fix cases where initial measurment of headerContainerHeight is not correct (need to investigate)
    // Happens in PageTestStories -> PageWithScroll -> 5. Scroll - Trigger Mini Header
    // Maybe there is a transition
    const ARBITRARY_SHORT_DURATION_MS = 100;
    setTimeout(this._calculateComponentsHeights, ARBITRARY_SHORT_DURATION_MS);
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    this._calculateComponentsHeights();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.contentResizeListener.detach(this._handleWidthResize);
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _getNamedChildren() {
    return getChildrenObject(this.props.children);
  }

  _calculateComponentsHeights() {
    const {
      headerContainerHeight,
      minimizedHeaderContainerHeight,
      tailHeight,
      pageHeight,
    } = this.state;

    const newHeaderContainerHeight = this.headerContainerRef
      ? this.headerContainerRef.getBoundingClientRect().height
      : 0;

    const newMinimizedHeaderContainerHeight = this.minimizedHeaderContainerRef
      ? this.minimizedHeaderContainerRef.getBoundingClientRect().height
      : null;
    const newTailHeight = this.pageHeaderTailRef
      ? this.pageHeaderTailRef.offsetHeight
      : 0;
    const newPageHeight = this.pageRef ? this.pageRef.offsetHeight : 0;

    if (
      headerContainerHeight !== newHeaderContainerHeight ||
      minimizedHeaderContainerHeight !== newMinimizedHeaderContainerHeight ||
      tailHeight !== newTailHeight ||
      pageHeight !== newPageHeight
    ) {
      this.setState({
        headerContainerHeight: newHeaderContainerHeight,
        minimizedHeaderContainerHeight: newMinimizedHeaderContainerHeight,
        tailHeight: newTailHeight,
        pageHeight: newPageHeight,
      });
    }
  }

  _setScrollContainer(scrollableContainerRef) {
    this.scrollableContentRef = scrollableContainerRef;

    this.props.scrollableContentRef &&
      this.props.scrollableContentRef(scrollableContainerRef);
  }

  _getScrollContainer() {
    return this.scrollableContentRef;
  }

  _handleScroll() {
    const containerScrollTop = this._getScrollContainer().scrollTop;

    const {
      displayMiniHeader,
      minimizedHeaderContainerHeight,
      headerContainerHeight,
    } = this.state;

    const minimizationDiff =
      headerContainerHeight - minimizedHeaderContainerHeight;

    const nextDisplayMiniHeader =
      minimizedHeaderContainerHeight === null
        ? false
        : containerScrollTop >= minimizationDiff;

    if (displayMiniHeader !== nextDisplayMiniHeader) {
      this.setState({
        displayMiniHeader: nextDisplayMiniHeader,
      });
    }
  }

  _handleWidthResize() {
    // Fixes width issues when scroll bar is present in windows
    const scrollContainer = this._getScrollContainer();
    const scrollBarWidth =
      scrollContainer &&
      scrollContainer.offsetWidth - scrollContainer.clientWidth;

    if (this.state.scrollBarWidth !== scrollBarWidth) {
      this.setState({ scrollBarWidth });
    }
  }

  _handleWindowResize() {
    // TODO: Optimize : https://developer.mozilla.org/en-US/docs/Web/Events/resize

    // Taken from here: https://github.com/kunokdev/react-window-size-listener/blob/d64c077fba4d4e0ce060464078c5fc19620528e6/src/index.js#L66
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    if (this.state.windowHeight !== windowHeight) {
      // We are not using windowHeight directly, since we need to measure the `<Page/>`'s height,
      // But we hold it in the state to avoid rendering when only window.width changes
      this.setState({ windowHeight });
    }
  }

  _safeGetChildren(element) {
    if (!element || !element.props || !element.props.children) {
      return [];
    }

    return element.props.children;
  }

  _getPageDimensionsStyle() {
    const { maxWidth, sidePadding } = this.props;
    if (!maxWidth && !sidePadding && sidePadding !== 0) {
      return null;
    }

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}px`;
    }

    if (sidePadding || sidePadding === 0) {
      styles.paddingLeft = `${sidePadding}px`;
      styles.paddingRight = `${sidePadding}px`;
    }

    return styles;
  }

  _hasBackgroundImage() {
    return !!this.props.backgroundImageUrl;
  }

  _hasGradientClassName() {
    return !!this.props.gradientClassName && !this.props.backgroundImageUrl;
  }

  _getMiniHeaderHeight() {
    return this.minimizedHeaderContainerRef
      ? this.minimizedHeaderContainerRef.getBoundingClientRect().height
      : null;
  }

  _getContentHorizontalLayoutProps() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageContent } = childrenObject;
    const contentFullScreen = PageContent && PageContent.props.fullScreen;
    const pageDimensionsStyle = this._getPageDimensionsStyle();

    return {
      className: classNames(s.contentHorizontalLayout, {
        [s.contentFullWidth]: contentFullScreen,
      }),
      style: contentFullScreen ? null : pageDimensionsStyle,
    };
  }

  _renderHeader({ minimized }) {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageTail, PageHeader: PageHeaderChild } = childrenObject;
    const pageDimensionsStyle = this._getPageDimensionsStyle();

    return (
      <div
        className={classNames(s.pageHeaderContainer, {
          [s.minimized]: minimized,
        })}
        ref={ref => {
          if (minimized) {
            this.minimizedHeaderContainerRef = ref;
          } else {
            this.headerContainerRef = ref;
          }
        }}
      >
        {PageHeaderChild && (
          <div className={s.pageHeader} style={pageDimensionsStyle}>
            {React.cloneElement(PageHeaderChild, {
              minimized,
              hasBackgroundImage: this._hasBackgroundImage(),
              upgrade: true,
            })}
          </div>
        )}
        {PageTail && (
          <div
            data-hook="page-tail"
            className={classNames(s.tail, { [s.minimized]: minimized })}
            style={pageDimensionsStyle}
            ref={r => (this.pageHeaderTailRef = r)}
          >
            {React.cloneElement(PageTail, { minimized })}
          </div>
        )}
      </div>
    );
  }

  _renderFixedContainer() {
    const { scrollBarWidth, displayMiniHeader } = this.state;
    const invisibleStyle = displayMiniHeader
      ? {}
      : {
          visibility: 'hidden',
          position: 'absolute',
          top: '-5000px', // arbitrary out of screen so it doesn't block click events
        };
    return (
      <div
        data-hook="page-fixed-container"
        style={{
          width: scrollBarWidth ? `calc(100% - ${scrollBarWidth}px` : undefined,
          ...invisibleStyle,
        }}
        className={classNames(s.fixedContainer)}
        onWheel={event => {
          this._getScrollContainer().scrollTop =
            this._getScrollContainer().scrollTop + event.deltaY;
        }}
      >
        {// We render but with visibility none, in order to measure the height
        this._renderHeader({ minimized: true })}
      </div>
    );
  }

  _renderScrollableContainer() {
    return (
      <div
        className={s.scrollableContainer}
        data-hook="page-scrollable-content"
        data-class="page-scrollable-content"
        ref={r => this._setScrollContainer(r)}
        onScroll={this._handleScroll}
      >
        {this._renderScrollableBackground()}
        {this._renderHeader({ minimized: false })}
        {this._renderContentWrapper()}
      </div>
    );
  }

  _renderScrollableBackground() {
    const { gradientCoverTail } = this.props;
    const { PageTail } = this._getNamedChildren();
    const { headerContainerHeight, tailHeight } = this.state;

    const imageHeight = `${headerContainerHeight +
      (PageTail ? -tailHeight : BACKGROUND_COVER_CONTENT_PX)}px`;

    const gradientHeight = gradientCoverTail
      ? `${headerContainerHeight +
          (PageTail ? -HEADER_BOTTOM_PADDING : BACKGROUND_COVER_CONTENT_PX)}px`
      : imageHeight;

    if (this._hasBackgroundImage()) {
      return (
        <div
          className={s.imageBackgroundContainer}
          style={{ height: imageHeight }}
          data-hook="page-background-image"
        >
          <div
            className={s.imageBackground}
            style={{ backgroundImage: `url(${this.props.backgroundImageUrl})` }}
          />
        </div>
      );
    }

    if (this._hasGradientClassName()) {
      return (
        <div
          data-hook="page-gradient-class-name"
          className={`${s.gradientBackground} ${this.props.gradientClassName}`}
          style={{ height: gradientHeight }}
        />
      );
    }
  }

  _renderContentWrapper() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageContent, PageFixedContent } = childrenObject;

    const { headerContainerHeight } = this.state;

    const { pageHeight } = this.state;

    const contentHorizontalLayoutProps = this._getContentHorizontalLayoutProps();
    const stretchToHeight =
      pageHeight - headerContainerHeight - PAGE_BOTTOM_PADDING_PX;

    return (
      <PageContext.Provider
        value={{
          stickyStyle: {
            top: `${this.state.minimizedHeaderContainerHeight}px`,
          },
        }}
      >
        <div
          className={classNames(contentHorizontalLayoutProps.className, [
            s.contentWrapper,
          ])}
          style={{
            ...contentHorizontalLayoutProps.style,
          }}
        >
          <div
            style={{
              minHeight: `${stretchToHeight}px`,
            }}
            className={s.contentFloating}
          >
            {PageFixedContent && (
              <PageSticky data-hook="page-fixed-content">
                {React.cloneElement(PageFixedContent)}
              </PageSticky>
            )}
            {this._safeGetChildren(PageContent)}
          </div>
        </div>
      </PageContext.Provider>
    );
  }

  render() {
    const { className, minWidth } = this.props;

    return (
      <div
        data-hook="wsr-page-wrapper"
        className={classNames(s.pageWrapper, className)}
      >
        <div
          data-hook="page"
          className={s.page}
          style={{
            minWidth: minWidth + 2 * PAGE_SIDE_PADDING_PX,
          }}
          ref={ref => (this.pageRef = ref)}
        >
          {this._renderFixedContainer()}
          {this._renderScrollableContainer()}
        </div>
      </div>
    );
  }
}

const FixedContent = props => props.children;
FixedContent.displayName = 'Page.FixedContent';
FixedContent.propTypes = {
  children: PropTypes.element.isRequired,
};

Page.displayName = 'Page';
Page.Header = PageHeader;
Page.Content = Content;
Page.FixedContent = FixedContent; // TODO: deprecate, use Page.Sticky instead
Page.Tail = Tail;
Page.Sticky = PageSticky;

Page.propTypes = {
  /** Background image url of the header beackground */
  backgroundImageUrl: PropTypes.string,
  /** Sets the max width of the content (Both in header and body) NOT including the page padding */
  maxWidth: PropTypes.number,
  /** Sets the min width of the content (Both in header and body) NOT including the page padding */
  minWidth: PropTypes.number,
  /** Sets padding of the sides of the page */
  sidePadding: PropTypes.number,
  /** A css class to be applied to the component's root element */
  className: PropTypes.string,
  /** Header background color class name, allows to add a gradient to the header */
  gradientClassName: PropTypes.string,
  /** If false Gradient will not cover Page.Tail */
  gradientCoverTail: PropTypes.bool,
  /** Is called with the Page's scrollable content ref **/
  scrollableContentRef: PropTypes.func,

  /** Accepts these components as children: `Page.Header`, `Page.Tail`, `Page.Content`, `Page.FixedContent`. Order is insignificant. */
  children: PropTypes.arrayOf((children, key) => {
    const childrenObj = getChildrenObject(children);

    if (!childrenObj.PageHeader) {
      return new Error(`Page: Invalid Prop children, must contain Page.Header`);
    }

    if (!childrenObj.PageContent) {
      return new Error(
        `Page: Invalid Prop children, must contain Page.Content`,
      );
    }

    if (
      children[key].type.displayName !== Page.Header.displayName &&
      children[key].type.displayName !== Page.Content.displayName &&
      children[key].type.displayName !== Page.FixedContent.displayName &&
      children[key].type.displayName !== Page.Tail.displayName
    ) {
      return new Error(
        `Page: Invalid Prop children, unknown child ${children[key].type}`,
      );
    }
  }).isRequired,

  /** When true the page will use height: 100% and not require a parent of `display: flex;flex-flow: column;`. Also Page.Content's may grow using `min-height: inherit`. Supports Page.Sticky. New header minimization approach.*/
  upgrade: PropTypes.bool, // This Upgrade prop is only for documentation, the actual use is in index.js
};

function getChildrenObject(children) {
  return React.Children.toArray(children).reduce((acc, child) => {
    switch (child.type.displayName) {
      case 'Page.Header': {
        acc.PageHeader = child;
        break;
      }
      case 'Page.Content': {
        acc.PageContent = child;
        break;
      }
      case 'Page.FixedContent': {
        acc.PageFixedContent = child;
        break;
      }
      case 'Page.Tail': {
        acc.PageTail = child;
        break;
      }
      default: {
        break;
      }
    }
    return acc;
  }, {});
}

export default Page;
