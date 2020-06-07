import React, { Component } from "react";

class TodoList extends Component {
  render() {
    return (
      <div>
        <table className="uk-table uk-table-justify uk-table-divider">
          <thead>
            <tr>
              <th>TODO</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {this.props.todos === undefined
              ? "loading..."
              : this.props.todos.map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td>{todo.text}</td>
                      <td>
                        {todo.completed === "completed"
                          ? "COMPLETED"
                          : "PLANNED"}
                      </td>
                      <td>
                        <button
                          value={todo.id}
                          className="uk-button uk-button-secondary"
                          onClick={this.props.handleMore}
                        >
                          MORE
                        </button>
                        <span>|</span>
                        <button
                          value={todo.id}
                          className="uk-button uk-button-primary"
                          onClick={this.props.handleEdit}
                        >
                          EDIT
                        </button>
                        <span>|</span>
                        <button
                          value={todo.id}
                          className="uk-button uk-button-danger"
                          onClick={this.props.handleDelete}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodoList;
