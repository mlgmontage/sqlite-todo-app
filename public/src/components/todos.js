import React, { Component } from "react";
import UIkit from "uikit";
import TodoList from "./todo-list";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleDelete(e) {
    const ind = e.target.value;
    UIkit.notification(`Delete handled ${ind}`);
  }

  fetchData() {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ todos: data });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return <TodoList todos={this.state.todos} />;
  }
}

export default Todos;
