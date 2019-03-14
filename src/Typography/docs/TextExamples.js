import React from 'react';
import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import { ExampleWrapper, capitalize, propsToJsxString } from './utils';

import styles from './styles.scss';

export const TextExample = props => {
  const { children, ...rest } = props;
  const size = capitalize(props.size);
  const weight = capitalize(props.weight);
  const secondary = props.secondary ? '.Secondary' : '';
  const skin = props.skin
    ? `.${capitalize(props.skin === 'error' ? 'Destructive' : `${props.skin}`)}`
    : '';
  const light = props.light ? '.Light' : secondary || skin ? '' : '.Dark';

  const code = `<Text${propsToJsxString(rest)}>${children}</Text>`;
  return (
    <Tooltip content={code} popover maxWidth={900} padding={24}>
      <div style={{ backgroundColor: props.light ? '#162d3d' : undefined }}>
        <ExampleWrapper
          label={`Text.${size}.${weight}${light}${secondary}${skin}`}
        >
          <div>
            <Text {...rest}>{children}</Text>
          </div>
        </ExampleWrapper>
      </div>
    </Tooltip>
  );
};
TextExample.propTypes = Text.propTypes;

const darkMedium = () => (
  <div style={{ padding: '24px' }}>
    {/* <Tooltip content="asdsa"> <span>asdasd</span></Tooltip> */}
    <table className={styles.textTable}>
      {/* thin */}
      <tr>
        <td>
          <TextExample size="medium" weight="thin">
            Running Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="thin" light>
            Running Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="thin" skin="error">
            Destructive Message, Inline Link
          </TextExample>
        </td>
      </tr>
      <tr>
        <td>
          <TextExample size="medium" weight="thin" secondary>
            Form Field Label, Secondary Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="thin" light secondary>
            Form Field Label, Secondary Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="thin" skin="premium">
            Premium Message, Inline Link
          </TextExample>
        </td>
      </tr>
      <tr>
        <td />
        <td />
        <td>
          <TextExample size="medium" weight="thin" skin="success">
            Success Message, Inline Link
          </TextExample>
        </td>
      </tr>
      {/* normal */}
      <tr>
        <td>
          <TextExample size="medium" weight="normal">
            Form Field, Button
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="normal" light>
            Button, Text Button
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="normal" skin="error">
            Destructive Message, Button, Text Button
          </TextExample>
        </td>
      </tr>
      <tr>
        <td>
          <TextExample size="medium" weight="normal" secondary>
            — Unasigned —
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="normal" light secondary>
            Input’s placeholder
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="normal" skin="premium">
            Premium Message, Button, Text Button
          </TextExample>
        </td>
      </tr>
      <tr>
        <td />
        <td />
        <td>
          <TextExample size="medium" weight="normal" skin="success">
            Success Message, Button, Text Button
          </TextExample>
        </td>
      </tr>

      {/* bold */}
      <tr>
        <td>
          <TextExample size="medium" weight="bold">
            Emphasized Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="bold" light>
            Emphasized Text
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="bold" skin="error">
            Emphasized Destructive Text
          </TextExample>
        </td>
      </tr>
      <tr>
        <td>
          <TextExample size="medium" weight="bold" secondary>
            — Unasigned —
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="bold" light secondary>
            — Unasigned —
          </TextExample>
        </td>
        <td>
          <TextExample size="medium" weight="bold" skin="premium">
            Emphasized Premium Text
          </TextExample>
        </td>
      </tr>
      <tr>
        <td />
        <td />
        <td>
          <TextExample size="medium" weight="bold" skin="success">
            Emphasized Success Text
          </TextExample>
        </td>
      </tr>
    </table>
  </div>
);

export default () => (
  <div style={{ display: 'flex' }}>
    {darkMedium()}
    {/* <div style={{width: '20px'}}/>
    {lightHeadingsColumn()} */}
  </div>
);
