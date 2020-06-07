import React, { Component } from "react";
import UIkit from "uikit";

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
    return (
      <div>
        {this.state.todos.map((todo) => {
          return (
            <div key={todo.id}>
              <button value={todo.id} onClick={this.handleDelete}>
                Delete
              </button>
              {todo.text}{" "}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Todos;
