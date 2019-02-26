import React from 'react';

import AllComponents from './all-components';
import { GmapsTestClient } from '../src/GoogleAddressInput/GoogleAddressInput.spec';

const {
  Popover,
  MultiSelect,
  AutoComplete,
  Input,
  Label,
  RichTextArea,
  Notification,
  FloatingHelper,
  GoogleAddressInput,
} = AllComponents;

/*
 * This file exports object with config for components.
 * It is used for automated teskit smoke tests
 *
 * { [component.displayName]: ComponentDefinition }
 *
 * [component.displayName] = {
 *   // hook function to be called before tests begin
 *   beforeAllHook?: function;
 *
 *   // hook function to be called after tests end
 *   afterAllHook?: function;
 *
 *   // set required props, if any
 *   props?: object;
 * }
 */

export default {
  ColorPicker: {
    props: {
      value: '#000',
      onChange: () => {},
      onCancel: () => {},
      onConfirm: () => {},
    },
  },

  MultiSelectComposite: {
    props: {
      children: <MultiSelect />,
    },
  },

  AutoCompleteComposite: {
    props: {
      children: [<AutoComplete key={1} />],
    },
  },

  Popover: {
    props: {
      children: [
        <Popover.Element>
          <div>I am the trigger!</div>
        </Popover.Element>,
        <Popover.Content>
          <div>I am the content!</div>
        </Popover.Content>,
      ],
    },
  },

  FloatingHelper: {
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
  },

  RichTextArea: {
    beforeAllHook: () => (window.getSelection = () => ({})),
  },

  RichTextAreaComposite: {
    props: {
      children: [<Label key="0">Label text</Label>, <RichTextArea key="1" />],
    },
  },

  Range: {
    props: {
      children: [<Input key="0" />, <Input key="1" />],
    },
  },

  Tag: {
    props: {
      id: 'hello',
      children: 'a',
    },
  },

  Badge: {
    props: {
      children: 'hello',
    },
  },

  ImageViewer: {
    props: {
      imageUrl: '',
    },
  },

  FormField: {
    props: {
      children: <div />,
    },
  },

  BadgeSelect: {
    props: {
      options: [{ id: '0', skin: 'general', text: 'general' }],
      selectedId: '0',
    },
  },

  CalendarPanel: {
    props: {
      onChange: () => {},
    },
  },

  Breadcrumbs: {
    props: {
      items: [{ id: 0, value: 'Option 1' }, { id: 1, value: 'Option 2' }],
    },
  },

  Calendar: {
    props: {
      onChange: () => {},
    },
  },

  CalendarPanelFooter: {
    props: {
      primaryActionLabel: 'Submit',
      secondaryActionLabel: 'Cancel',
      primaryActionDisabled: false,
      primaryActionOnClick: () => null,
      secondaryActionOnClick: () => null,
      dateToString: () => 'a string',
    },
  },

  DataTable: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },

  Slider: {
    props: {
      onChange: () => {},
    },
  },

  Selector: {
    props: {
      id: 1,
      title: 'title',
    },
  },

  StatsWidget: {
    props: {
      title: 'test title',
    },
  },

  Table: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },

  Tabs: {
    props: {
      items: [],
    },
  },

  Modal: {
    props: {
      isOpen: false,
    },
  },

  Notification: {
    props: {
      children: [
        <Notification.TextLabel key="0">label</Notification.TextLabel>,
        <Notification.CloseButton key="1" />,
      ],
    },
  },

  DatePicker: {
    props: {
      onChange: () => {},
    },
  },

  ModalSelectorLayout: {
    props: {
      dataSource: () =>
        Promise.resolve({
          items: [],
          totalCount: 0,
        }),
    },
  },

  Proportion: { props: { children: 'test' } },

  Box: {
    props: {
      children: <div />,
    },
  },

  GoogleAddressInputWithLabel: {
    props: {
      children: <GoogleAddressInput Client={GmapsTestClient} />,
    },
  },
};
