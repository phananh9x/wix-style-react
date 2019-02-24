export const importExample = `
import FormField from 'wix-style-react/FormField';
import RichTextArea from 'wix-style-react/RichTextArea'
`;

export const plainFormFieldComposition = `
<FormField label="Rich Text Area">
  <RichTextArea />
</FormField>
`;

export const textStylingFormFieldComposition = `
<FormField label="Rich Text Area" infoContent="I help you to fill info" required>
  <RichTextArea value="<p>This component supports bullet point lists and text styling:</p><ol><li><strong>Bold</strong></li><li><em>Italic</em></li><li><u>Underline</u></li><li><a href='https://github.com/wix/wix-style-react'>Hyperlink</a></li></ol>" />
</FormField>
`;

export const resizable = `
<RichTextArea resizable />
`;

export const error = `
<RichTextArea error />
`;

export const disabled = `
<RichTextArea disabled />
`;

export const placeholder = `
<RichTextArea placeholder="This is a placeholder" />
`;
