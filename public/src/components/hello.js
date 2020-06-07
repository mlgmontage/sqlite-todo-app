import React from "react";
import UIkit from "uikit";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Constructror",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    UIkit.notification("Hello, world");
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>{this.state.message}</h1>
      </div>
    );
  }
}

export default Hello;
