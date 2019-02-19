import PropTypes from 'prop-types';

const Content = ({ children, stickyStyle }) => {
  if (typeof children === 'function') {
    return children({ stickyStyle });
  } else {
    return children;
  }
};

Content.displayName = 'Page.Content';
Content.propTypes = {
  children: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool,
};
export default Content;
