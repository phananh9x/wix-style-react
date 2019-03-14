/* eslint-disable */

class ControlledThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      thumbnails: ["first", "second", "third"]
    };
  }

  render() {
    const { selected, thumbnails } = this.state;

    return (
      <Layout gap="12px">
        {thumbnails.map(thumbnail => (
          <Cell key={thumbnail} span={4}>
            <Thumbnail
              selected={selected.includes(thumbnail)}
              title={`${thumbnail} thumbnail`}
              description={`This thumbnail is ${
                selected.includes(thumbnail) ? "" : "not "
              }selected `}
              onClick={() =>
                this.setState(({ selected }) => ({
                  selected: selected.includes(thumbnail)
                    ? selected.filter(s => s !== thumbnail)
                    : [...selected, thumbnail]
                }))
              }
            />
          </Cell>
        ))}
      </Layout>
    );
  }
}

render(<ControlledThumbnail />);
