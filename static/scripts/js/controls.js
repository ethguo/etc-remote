(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*** @jsx React.DOM */

function NumpadButton(props) {
  return (
    React.createElement("button", {className: "numpad-button", onClick: () => props.onClick()}, 
      props.text
    )
  );
}

class Numpad extends React.Component {
  renderButton(i) {
    return (
      React.createElement("td", null, 
        React.createElement(NumpadButton, {text: i, onClick: () => this.props.appendCommand(i, i)})
      )
    );
  }
  render() {
    return (
      React.createElement("table", {id: "numpad-table"}, 
        React.createElement("tbody", null, 
          React.createElement("tr", null, 
            this.renderButton(1), 
            this.renderButton(2), 
            this.renderButton(3)
          ), 
          React.createElement("tr", null, 
            this.renderButton(4), 
            this.renderButton(5), 
            this.renderButton(6)
          ), 
          React.createElement("tr", null, 
            this.renderButton(7), 
            this.renderButton(8), 
            this.renderButton(9)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null), 
            this.renderButton(0), 
            React.createElement("td", null)
          )
        )
      )
    );
  }
}

function CommandButton(props) {
  return (
    React.createElement("button", {className: ".command-button" + props.small?" command-button-small":"", onClick: () => props.onClick()}, 
      props.text
    )
  );
}

class CommandPalette extends React.Component {
  renderButton(repr, i, small) {
    return (
      React.createElement("td", null, 
        React.createElement(CommandButton, {small: small, text: repr, onClick: () => this.props.appendCommand(repr, "*" + i)})
      )
    );
  }
  render() {
    return (
      React.createElement("table", {id: "command-table"}, 
        React.createElement("tbody", null, 
          React.createElement("tr", null, 
            this.renderButton("+", 1), 
            this.renderButton("Thru", 2), 
            this.renderButton("-", 3)
          ), 
          React.createElement("tr", null, 
            this.renderButton("Last", 4), 
            this.renderButton("Macro", 5), 
            this.renderButton("@", 6)
          ), 
          React.createElement("tr", null, 
            this.renderButton("Next", 7), 
            this.renderButton("Address", 8, true), 
            this.renderButton("Full", 9)
          ), 
          React.createElement("tr", null, 
            this.renderButton("Clear", "*"), 
            this.renderButton("Chan Check", 0, true), 
            this.renderButton("Sneak", "#")
          )
        )
      )
    );
  }
}

class CommandLine extends React.Component {
  render() {
    return (
      React.createElement("div", null, 
        React.createElement("table", {id: "commandline-table"}, 
          React.createElement("tbody", null, 
            React.createElement("tr", null, 
              React.createElement("td", null, "Command"), 
              React.createElement("td", null, React.createElement("input", {type: "text", value: this.props.command.join("")}))
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Raw"), 
              React.createElement("td", null, React.createElement("input", {type: "text", value: this.props.commandRaw.join("")}))
            )
          )
        ), 

        React.createElement("form", {action: "/post", method: "POST"}, 
          React.createElement("input", {type: "hidden", name: "command", value: this.props.commandRaw.join("")}), 
          React.createElement("input", {type: "submit", value: "ENTER", className: "enter-button"})
        )
      )
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
      React.createElement("div", null, 
        React.createElement(Numpad, {appendCommand: (val) => this.appendCommand(val, val)}), 
        React.createElement(CommandPalette, {appendCommand: (repr, raw) => this.appendCommand(repr, raw)}), 
        React.createElement(CommandLine, {command: this.state.command, commandRaw: this.state.commandRaw})
      )
    );
  }
}

ReactDOM.render(
  React.createElement(Controls, null),
  document.getElementById("controls")
);
},{}]},{},[1]);
