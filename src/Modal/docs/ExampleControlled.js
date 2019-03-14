import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'wix-style-react/Modal';
import Button from 'wix-style-react/Button';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import { Container, Row, Col } from 'wix-style-react/Grid';
import DatePicker from 'wix-style-react/DatePicker';

class ControlledModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  };

  constructor({ isOpen = false }) {
    super();
    this.state = {
      isOpenBlueModal: isOpen,
      isOpenModalWithDatePicker: false,
      isOpenModalWithCloseButton: false,
    };
  }

  render() {
    const setState = state => () => this.setState(state);

    const closeBlueModal = setState({ isOpenBlueModal: false });
    const openBlueModal = setState({ isOpenBlueModal: true });

    const closeModalWithDatePicker = setState({
      isOpenModalWithDatePicker: false,
    });
    const openModalWithDatePicker = setState({
      isOpenModalWithDatePicker: true,
    });

    const closeModalWithCloseButton = setState({
      isOpenModalWithCloseButton: false,
    });
    const openModalWithCloseButton = setState({
      isOpenModalWithCloseButton: true,
    });

    return (
      <Container>
        <Row>
          <Col span={3}>
            <Button onClick={openBlueModal}>Open Blue Modal</Button>
            <Modal
              isOpen={this.state.isOpenBlueModal}
              onRequestClose={closeBlueModal}
              contentLabel="Modal Example"
              scrollableContent={false}
            >
              <MessageBoxFunctionalLayout
                theme="blue"
                title="title"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeBlueModal}
                onCancel={closeBlueModal}
              >
                Hello blue world!
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
          <Col span={3}>
            <Button onClick={openModalWithDatePicker}>
              Open with DatePicker
            </Button>
            <Modal
              isOpen={this.state.isOpenModalWithDatePicker}
              onRequestClose={closeModalWithDatePicker}
              contentLabel="Modal Example"
              scrollableContent={false}
            >
              <MessageBoxFunctionalLayout
                theme="blue"
                title="title"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeModalWithDatePicker}
                onCancel={closeModalWithDatePicker}
              >
                <Container fluid>
                  <Row>
                    <Col span={3}>Insert Date</Col>
                    <Col span={9}>
                      <DatePicker />
                    </Col>
                  </Row>
                </Container>
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
          <Col span={4}>
            <Button onClick={openModalWithCloseButton}>
              Open Modal With Close Button
            </Button>
            <Modal
              isOpen={this.state.isOpenModalWithCloseButton}
              onRequestClose={closeModalWithCloseButton}
              shouldDisplayCloseButton
              contentLabel="Modal With Close Button Example"
              scrollableContent={false}
            >
              <MessageBoxFunctionalLayout
                theme="blue"
                title="Modal With Close Button Example"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeModalWithCloseButton}
                onCancel={closeModalWithCloseButton}
              >
                I Have a close button on the upper right corner but its
                impossible to press without deleting the github creature first
                using the console
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default () => (
  <div>
    <ControlledModal />
  </div>
);
