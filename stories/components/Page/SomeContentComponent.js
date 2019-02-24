import React from 'react';
import { bool } from 'prop-types';
import times from '../../../src/utils/operators/times';

export const LongTextContent = props => {
  const pages = times(props.numOfPages, (x, i) => (
    <div key={i}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis
        molestie magna vitae pellentesque. Ut elementum accumsan nibh, ut
        faucibus velit. Vestibulum at mollis justo. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia Curae; In sapien
        odio, hendrerit a iaculis ut, venenatis in ligula. Vestibulum suscipit
        egestas augue, nec mattis est mollis et. Curabitur id eleifend leo.
        Fusce tempor efficitur commodo.
        <br />
        <br />
        Cras porta augue non erat imperdiet ornare. Aliquam aliquam elit nec
        erat ultricies, ac blandit purus efficitur. Suspendisse sagittis id nibh
        eget pulvinar. Phasellus congue ultricies interdum. Mauris vel dolor at
        diam feugiat imperdiet feugiat varius eros. Aenean accumsan interdum
        massa vitae semper. Maecenas tincidunt ut lectus a fringilla. In
        eleifend ante in tellus consequat vestibulum. Fusce lacinia turpis quis
        turpis semper venenatis. Donec faucibus felis nisi, non maximus augue
        mattis ac. Ut erat sem, finibus vel gravida sed, hendrerit ac nibh.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et
        egestas lectus. Ut vitae est maximus, viverra sem et, pharetra diam.
        <br />
        <br />
        Vivamus quis nunc maximus elit ullamcorper ullamcorper non sit amet
        metus. Mauris consequat tortor ac ante vestibulum lacinia. Vestibulum
        molestie risus purus, nec faucibus odio iaculis vitae. Integer erat
        magna, interdum et venenatis vel, aliquet id nunc. Vivamus nec pharetra
        dui. Nam sed quam ultricies, molestie dui a, tempus felis. Pellentesque
        tincidunt tortor eu tempus porttitor. Nam vitae dapibus lacus, a gravida
        ligula. Vestibulum eget pulvinar mauris. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse
        platea dictumst. Sed ultrices bibendum urna, elementum condimentum est
        faucibus et. Aenean a hendrerit ipsum. Sed aliquam ligula sed magna
        commodo, sit amet fringilla urna scelerisque. Phasellus at felis sed
        neque euismod tincidunt vitae id leo.
        <br />
        <br />
        Donec vel felis id mauris iaculis posuere eget eu purus. Duis id libero
        dolor. Vivamus nec ornare nunc. Ut efficitur quis sem quis consectetur.
        Suspendisse et justo ac sem rhoncus posuere et eget quam. Phasellus sit
        amet viverra nulla, vel tincidunt ante. Duis nec commodo lorem.
        <br />
        <br />
        Proin orci nisl, facilisis ut efficitur sit amet, sollicitudin et metus.
        Nunc dictum laoreet convallis. Praesent iaculis consequat elit non
        consectetur. In risus ex, efficitur non tempor ac, suscipit ut nisi.
        Etiam vel vehicula eros. Sed molestie, metus sed tristique fringilla,
        tortor metus facilisis justo, sit amet blandit dolor urna eget diam.
        Etiam nec lorem cursus nisl finibus venenatis. Ut consequat dui non
        pharetra fringilla. Nulla facilisi.
        {i < props.numOfPages - 1 && [<br key="br1" />, <br key="br2" />]}
      </div>
    </div>
  ));

  return <div>{pages}</div>;
};

LongTextContent.defaultProps = {
  numOfPages: 5,
};

export default class SomeContentComponent extends React.Component {
  static propTypes = {
    shortContent: bool,
    stretchVertically: bool,
  };

  getBody() {
    return;
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: 'white',
          minHeight: this.props.stretchVertically ? 'inherit' : undefined,
        }}
      >
        <LongTextContent numOfPages={this.props.shortContent ? 1 : undefined} />
      </div>
    );
  }
}
