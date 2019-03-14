import * as React from 'react';
import FloatingHelper from 'wix-style-react/FloatingHelper';

export class ProgrammaticExample extends React.Component {
  helperRef;

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.helperRef.open()}>Click to open</button>
        </div>
        <FloatingHelper
          ref={ref => (this.helperRef = ref)}
          initiallyOpened={false}
          target={<span>I am a FloatingHelper target</span>}
          content={
            <FloatingHelper.Content
              title="Don’t forget to setup payments"
              body="In order to sell your music you need to choose a payment method."
            />
          }
          placement="right"
        />
      </div>
    );
  }
}
