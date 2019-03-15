import buttonDriverFactory from '../Deprecated/Button/Button.driver';

import addItemDriverFactory from '../AddItem/AddItem.driver';
import tooltipDriverFactory from '../Deprecated/Tooltip/Tooltip.driver';

const imageViewerDriverFactory = ({ element, eventTrigger }) => {
  const addItemDataHook = 'add-image';
  const updateDataHook = 'update-image';
  const removeDataHook = 'remove-image';

  const byHook = dataHook => element.querySelector(`[data-hook="${dataHook}"]`);
  const image = () => byHook('image-viewer-image');
  const errorIcon = () => byHook('error-tooltip');
  const addItem = () => byHook(addItemDataHook);
  const addItemDriver = addItemDriverFactory({
    element,
    eventTrigger,
  });
  const tooltipDriver = addItemDriver.getTooltipDriver();
  const addItemClick = () =>
    addItemDriverFactory({
      element: byHook('add-image'),
      eventTrigger,
    }).click();
  const updateIcon = () => byHook(updateDataHook);
  const removeIcon = () => byHook(removeDataHook);
  const updateButton = () =>
    buttonDriverFactory({ element: byHook(updateDataHook) });
  const removeButton = () =>
    buttonDriverFactory({ element: byHook(removeDataHook) });

  return {
    getAddItemDataHook: () => addItemDataHook,
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    getImageUrl: () => image().getAttribute('src'),
    getErrorTooltipContent: () =>
      tooltipDriverFactory({
        element: errorIcon(),
      }).hoverAndGetContent(),
    getAddTooltipContent: () => tooltipDriver.hoverAndGetContent(),
    getUpdateTooltipContent: () =>
      tooltipDriverFactory({
        element: updateIcon(),
      }).hoverAndGetContent(),
    getRemoveTooltipContent: () =>
      tooltipDriverFactory({
        element: removeIcon(),
      }).hoverAndGetContent(),
    isAddItemVisible: () => !!addItem(),
    isImageVisible: () => !!image(),
    isErrorVisible: () => !!errorIcon(),
    clickAdd: () => addItemClick(),
    clickUpdate: () => updateButton().click(),
    clickRemove: () => removeButton().click(),
    updateExists: () => updateButton().exists(),
    exists: () => !!element,
  };
};

export default imageViewerDriverFactory;
