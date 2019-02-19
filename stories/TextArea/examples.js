export const importExample = `
import FormField from 'wix-style-react/FormField';
import InputArea from 'wix-style-react/InputArea';
`;

export const basicExample = `
<FormField
label="This is the FormField label"
required
infoContent="This is the info tooltip content"
>
  <InputArea
    placeholder="Placeholder Text"
  />
</FormField>
`;

export const resizableHeightExample = `
<FormField
label="This is the FormField label"
required
infoContent="This is the info tooltip content"
>
  <InputArea
    placeholder="Placeholder Text"
    resizable
    value="Free Philippine Real Estate Ads Forums And Classifieds Advertising On A Budget Part 3 Frequency Frequency Frequency Forums Philippine"
  />
</FormField>
`;

export const withoutALabelExample = `
<FormField
  required
  infoContent="This is the info tooltip content"
>
  <InputArea
    placeholder="Placeholder Text"
    value="Free Philippine Real Estate Ads Forums And Classifieds Advertising On A Budget Part 3 Frequency Frequency Frequency Forums Philippine"
  />
</FormField>
`;
