/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import TestBackend from 'react-dnd-test-backend';
import { DraggableSource } from './Draggable';
import { DragDropContextProvider } from 'react-dnd';

import { draggableTestkitFactory as enzymeDraggableTestkitFactory } from '../../../testkit/enzyme';
import { mount } from 'enzyme';

describe('Draggable', () => {
  // TODO: fix or remove tests if not relevant
  // eslint-disable-next-line jest/no-disabled-tests
  xit('is draggable', async () => {
    const dataHook = 'draggable-content';
    const render = ({ isPlaceholder }) =>
      isPlaceholder ? <div data-hook={dataHook} /> : null;

    render.propTypes = {
      isPlaceholder: PropTypes.bool,
    };

    const props = {
      render,
      id: '1',
      dataHook: 'draggable',
    };

    const wrapper = mount(
      <DragDropContextProvider backend={TestBackend}>
        <DraggableSource {...props} />
      </DragDropContextProvider>,
    );

    const testkit = enzymeDraggableTestkitFactory({
      dataHook: 'draggable',
      wrapper,
    });

    console.info(wrapper.instance());

    const backend = wrapper
      .instance()
      .getManager()
      .getBackend();

    const draggable = wrapper.find(DraggableSource);
    const handleId = draggable.instance().getHandlerId();

    backend.simulateBeginDrag([handleId]);

    expect(testkit.childByHook(dataHook)).not.toBeNull;
  });
});
