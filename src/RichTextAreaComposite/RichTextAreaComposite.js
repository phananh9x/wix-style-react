import React from 'react';
import * as Composite from '../Composite';
import RichTextArea from '../RichTextArea';
import Label from '../Label';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';
import deprecationLog from '../utils/deprecationLog';

const RichTextAreaComposite = ({ children, ...props }) => {
  deprecationLog(
    `Usage of <RichTextAreaComposite/> is deprecated, use a composition of <RichTextArea/> and <FormField/> instead. Check out storybook for more details: https://wix-wix-style-react.surge.sh/?selectedKind=3.%20Inputs&selectedStory=3.3%20RichTextArea&full=0&addons=0&stories=1&panelRight=0`,
  );

  return (
    <InputAreaWithLabelComposite {...props}>
      {children}
    </InputAreaWithLabelComposite>
  );
};

RichTextAreaComposite.propTypes = {
  children: Composite.children(
    Composite.optional(Label),
    Composite.once(RichTextArea),
  ),
};

RichTextAreaComposite.displayName = 'RichTextAreaComposite';

export default RichTextAreaComposite;
