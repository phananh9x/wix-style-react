import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import Modal from 'wix-style-react/Modal';

class FullScreenModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpenFullScreenModal: false,
    };
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeFullScreenModal = setState({ isOpenFullScreenModal: false });
    const openFullScreenModal = setState({ isOpenFullScreenModal: true });
    return (
      <div>
        <Button
          dataHook="open-full-screen-modal-button"
          onClick={openFullScreenModal}
        >
          Open Full Screen Modal
        </Button>
        <Modal
          isOpen={this.state.isOpenFullScreenModal}
          onRequestClose={closeFullScreenModal}
          contentLabel="Full screen modal example"
        >
          <MessageBoxFunctionalLayout
            cancelText="Cancel"
            confirmText="OK"
            dataHook="fullscreen-modal"
            fullscreen
            onCancel={closeFullScreenModal}
            onOk={closeFullScreenModal}
            theme="blue"
            title="Full screen modal"
          >
            I&apos;m full screen modal!
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <FullScreenModal />;
