import React from 'react';
import PropTypes from 'prop-types';
import Delete from 'wix-ui-icons-common/Delete';
import Replace from 'wix-ui-icons-common/Replace';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import classNames from 'classnames';

import style from './ImageViewer.scss';
import Tooltip from '../Deprecated/Tooltip';
import Button from '../Deprecated/Button';
import WixComponent from '../BaseComponents/WixComponent';
import AddItem from '../AddItem/AddItem';

const DEFAULT_TOOLTIP_PROPS = {
  showDelay: 0,
  hideDelay: 0,
  align: 'center',
  placement: 'top',
  theme: 'dark',
};

class ImageViewer extends WixComponent {
  render() {
    const {
      imageUrl,
      onAddImage,
      onUpdateImage,
      onRemoveImage,
      addImageInfo,
      showUpdateButton,
      updateImageInfo,
      removeImageInfo,
      width,
      height,
      error,
      errorMessage,
      tooltipPlacement,
    } = this.props;
    const classes = classNames(style.container, {
      [style.hasLogo]: imageUrl,
      [style.hasError]: error,
    });
    const tooltipProps = {
      ...DEFAULT_TOOLTIP_PROPS,
      ...this.props.tooltipProps,
    };
    return (
      <div className={classes} style={{ width, height }}>
        {!imageUrl && (
          <AddItem
            onClick={onAddImage}
            theme="image"
            dataHook="add-image"
            tooltipProps={{ ...tooltipProps, content: addImageInfo }}
          />
        )}
        {!!imageUrl && (
          <div className={style.changeLogoContainer}>
            <div className={style.imageLayout}>
              <img
                data-hook="image-viewer-image"
                className={style.image}
                src={imageUrl}
              />
            </div>
            <div className={style.imageBackground}>
              <div className={style.buttons}>
                {!!showUpdateButton && (
                  <Tooltip
                    dataHook="update-image"
                    {...tooltipProps}
                    content={updateImageInfo}
                  >
                    <Button onClick={onUpdateImage} theme="icon-whitesecondary">
                      <Replace size="1.5em" />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip
                  dataHook="remove-image"
                  {...tooltipProps}
                  content={removeImageInfo}
                >
                  <Button theme="icon-whitesecondary" onClick={onRemoveImage}>
                    <Delete size="1.5em" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
        {!!error && (
          <Tooltip
            dataHook="error-tooltip"
            disabled={!errorMessage}
            content={errorMessage}
            {...tooltipProps}
            placement={tooltipPlacement || tooltipProps.placement}
          >
            <div className={style.exclamation}>
              <FormFieldError />
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
}

ImageViewer.displayName = 'ImageViewer';

ImageViewer.defaultProps = {
  showUpdateButton: true,
  addImageInfo: 'Add Image',
  updateImageInfo: 'Update',
  removeImageInfo: 'Remove',
};

/* eslint-disable no-unused-vars */
const { content, ...imageViewerTooltipProps } = Tooltip.propTypes;

ImageViewer.propTypes = {
  /** Image url, blank for not uploaded */
  imageUrl: PropTypes.string,
  /** Show error icon */
  error: PropTypes.bool,
  /** Error tooltip message */
  errorMessage: PropTypes.string,
  /** Error tooltip placement
   * @deprecated
   * @see tooltipProps
   */
  tooltipPlacement: PropTypes.string,
  /** Tooltip props, common for all tooltips */
  tooltipProps: PropTypes.shape(imageViewerTooltipProps),
  /** Show update button */
  showUpdateButton: PropTypes.bool,
  /** Add image click handler */
  onAddImage: PropTypes.func,
  /** Update image click handler */
  onUpdateImage: PropTypes.func,
  /** Remove image click handler */
  onRemoveImage: PropTypes.func,
  /** Add image tooltip */
  addImageInfo: PropTypes.string,
  /** Update image tooltip */
  updateImageInfo: PropTypes.string,
  /** Remove image tooltip */
  removeImageInfo: PropTypes.string,
  /** Element width */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Element height */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ImageViewer;
