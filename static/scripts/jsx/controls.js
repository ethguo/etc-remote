/*** @jsx React.DOM */

function NumpadButton(props) {
  return (
    <button className="numpad-button" onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}

class Numpad extends React.Component {
  renderButton(i) {
    return (
      <td>
        <NumpadButton text={i} onClick={() => this.props.appendCommand(i, i)} />
      </td>
    );
  }
  render() {
    return (
      <table id="numpad-table">
        <tbody>
          <tr>
            {this.renderButton(1)}
            {this.renderButton(2)}
            {this.renderButton(3)}
          </tr>
          <tr>
            {this.renderButton(4)}
            {this.renderButton(5)}
            {this.renderButton(6)}
          </tr>
          <tr>
            {this.renderButton(7)}
            {this.renderButton(8)}
            {this.renderButton(9)}
          </tr>
          <tr>
            <td></td>
            {this.renderButton(0)}
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

function CommandButton(props) {
  return (
    <button className={props.small?"command-button-small":"command-button"} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}

class CommandPalette extends React.Component {
  renderButton(repr, i, small) {
    return (
      <td>
        <CommandButton small={small} text={repr} onClick={() => this.props.appendCommand(repr, "*" + i)} />
      </td>
    );
  }
  render() {
    return (
      <table id="command-table">
        <tbody>
          <tr>
            {this.renderButton("+", 1)}
            {this.renderButton("Thru", 2)}
            {this.renderButton("-", 3)}
          </tr>
          <tr>
            {this.renderButton("Last", 4)}
            {this.renderButton("Macro", 5)}
            {this.renderButton("@", 6)}
          </tr>
          <tr>
            {this.renderButton("Next", 7)}
            {this.renderButton("Address", 8, true)}
            {this.renderButton("Full", 9)}
          </tr>
          <tr>
            {this.renderButton("Clear", "*")}
            {this.renderButton("Chan Check", 0, true)}
            {this.renderButton("Sneak", "#")}
          </tr>
        </tbody>
      </table>
    );
  }
}

class CommandLine extends React.Component {
  render() {
    return (
      <div>
        <table id="commandline-table">
          <tbody>
            <tr>
              <td>Command</td>
              <td><input type="text" value={this.props.command.join("")} /></td>
            </tr>
            <tr>
              <td>Raw</td>
              <td><input type="text" value={this.props.commandRaw.join("")} /></td>
            </tr>
          </tbody>
        </table>

        <form action="/post" method="POST">
          <input type="hidden" name="command" value={this.props.commandRaw.join("")} />
          <input type="submit" value="ENTER" className="enter-button" />
        </form>
      </div>
    )
  }
}

class Controls extends React.Component {
  appendCommand(repr, raw) {
    if (raw == "**") {
      this.setState({
        command: this.state.command.slice(0, -1),
        commandRaw: this.state.commandRaw.slice(0, -1)
      })
    } else {
      this.setState({
        command: this.state.command.concat(repr),
        commandRaw: this.state.commandRaw.concat(raw)
      })
    }
  }
  constructor() {
    super();
    this.state = {
      command: [],
      commandRaw: []
    };
  }
  render() {
    return (
      <div>
        <Numpad appendCommand={(val) => this.appendCommand(val, val)} />
        <CommandPalette appendCommand={(repr, raw) => this.appendCommand(repr, raw)} />
        <CommandLine command={this.state.command} commandRaw={this.state.commandRaw} />
      </div>
    );
  }
}

ReactDOM.render(
  <Controls />,
  document.getElementById("controls")
);
