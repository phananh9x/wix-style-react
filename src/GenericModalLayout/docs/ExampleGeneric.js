import PropTypes from 'prop-types';
import React from 'react';
import Button from 'wix-style-react/Button';
import GenericModalLayout from 'wix-style-react/GenericModalLayout';
import Modal from 'wix-style-react/Modal';

import styles from './ExampleGeneric.scss';

export default class ExampleGeneric extends React.Component {
  constructor() {
    super();

    this.state = {
      isModalOpened: false,
    };
  }

  openModal() {
    this.setState({
      isModalOpened: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpened: false,
    });
  }

  render() {
    const { header, content, footer, fullscreen } = this.props;

    return (
      <div>
        <Button dataHook="open-modal-button" onClick={() => this.openModal()}>
          Open Layout in Modal
        </Button>

        <Modal
          isOpen={this.state.isModalOpened}
          onRequestClose={() => this.closeModal()}
          contentLabel="Generic Modal layout"
          shouldDisplayCloseButton
        >
          <GenericModalLayout
            header={<div className={styles.header}>{header}</div>}
            content={<div className={styles.content}>{content}</div>}
            footer={<div className={styles.footer}>{footer}</div>}
            fullscreen={fullscreen}
            dataHook="generic-modal-layout"
          />
        </Modal>
      </div>
    );
  }
}

ExampleGeneric.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  fullscreen: PropTypes.bool,
};

ExampleGeneric.displayName = 'GenericModalLayout';
