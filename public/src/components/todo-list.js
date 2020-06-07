import React, { Component } from "react";

class TodoList extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.todos === undefined
            ? "loading..."
            : this.props.todos.map((todo) => {
                return (
                  <div key={todo.id}>
                    <button
                      value={todo.id}
                      className="uk-button uk-button-default"
                      onClick={this.props.handleDelete}
                    >
                      Delete
                    </button>
                    {todo.text}{" "}
                    {todo.completed === "completed" ? (
                      <span className="uk-badge">{todo.completed}</span>
                    ) : (
                      <span className="uk-badge">{todo.completed}</span>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

export default TodoList;
