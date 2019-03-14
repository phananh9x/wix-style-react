/* eslint-disable */

class ExampleControlledMouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _open() {
    this.setState({ open: true });
  }

  _close() {
    this.setState({ open: false });
  }

  _onKeyDown(e, delegateKeyDown) {
    const eventWasHandled = delegateKeyDown(e);

    // We'll open the list when pressing the Enter key
    if (!eventWasHandled && e.key === 'Enter') {
      this._open();
      e.preventDefault();
      return;
    }

    // Close on escape
    if (e.key === 'Escape') {
      this._close();
      e.preventDefault();
    }
  }

  render() {
    const { open } = this.state;

    return (
      <DropdownBase
        data-hook="story-dropdown-base-controlled-mouse"
        showArrow
        open={open}
        onMouseEnter={this._open}
        onMouseLeave={this._close}
        onSelect={this._close}
        options={[
          { id: 0, value: 'First option' },
          { id: 1, value: 'Second option' },
          { id: 2, value: 'Third option' },
          { id: 3, value: 'Fourth option' },
          { id: 4, value: 'Fifth option' },
          { id: 5, value: 'Sixth option' },
        ]}
      >
        {({ delegateKeyDown, selectedOption = {} }) => {
          return (
            <Button
              upgrade
              onKeyDown={e => this._onKeyDown(e, delegateKeyDown)}
            >
              {selectedOption.value || 'Nothing is selected'}
            </Button>
          );
        }}
      </DropdownBase>
    );
  }
}

render(
  <div style={{ textAlign: 'center' }}>
    <ExampleControlledMouse />
  </div>,
);
