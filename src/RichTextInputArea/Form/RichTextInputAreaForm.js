import React from 'react';

import styles from './RichTextInputAreaForm.scss';
import Tooltip from '../../Tooltip';
import Box from '../../Box';
import IconButton from '../../IconButton';
import Check from '../../new-icons/Check';
import X from '../../new-icons/X';

class RichTextInputAreaForm extends React.PureComponent {
  render() {
    const { dataHook, children, onSubmit, onCancel, isDisabled } = this.props;

    return (
      <form data-hook={dataHook} onSubmit={onSubmit}>
        {children}
        <div className={styles.footer}>
          <Tooltip content="Cancel" theme="dark" appendToParent>
            <IconButton
              dataHook="richtextarea-form-cancel-button"
              priority="secondary"
              size="small"
              onClick={onCancel}
            >
              <X />
            </IconButton>
          </Tooltip>
          <Box inline marginLeft={1}>
            <Tooltip content="Confirm" theme="dark" appendToParent>
              <IconButton
                dataHook="richtextarea-form-confirm-button"
                type="submit"
                size="small"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                <Check />
              </IconButton>
            </Tooltip>
          </Box>
        </div>
      </form>
    );
  }
}

export default RichTextInputAreaForm;
