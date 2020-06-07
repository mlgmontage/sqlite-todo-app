import React, { Component } from "react";
import UIkit from "uikit";
import TodoList from "./todo-list";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: "",
      completed: "planned",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }

  handleEdit(e) {
    const ind = e.target.value;
    UIkit.notification(`<div class="uk-alert-warning">${ind}</div>`);
  }

  handleMore(e) {
    const ind = e.target.value;
    UIkit.notification(`<div class="uk-alert-success">${ind}</div>`);
  }

  handleDelete(e) {
    const ind = e.target.value;
    fetch(`http://localhost:3000/todo/delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ind,
      }),
    }).then(() => {
      UIkit.notification(
        `<div class="uk-alert-warning">Todo with number ${ind} has been deleted</div>`
      );
      this.fetchData();
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addTodo(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/todo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: this.state.text,
        completed: this.state.completed,
      }),
    }).then(() => {
      UIkit.notification(
        `<div class="uk-alert-success">Your todo has been added to list</div>`
      );
      this.fetchData();
      this.setState({
        text: "",
      });
    });
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
        <form onSubmit={this.addTodo}>
          <fieldset className="uk-fieldset">
            <legend className="uk=legend">
              <h4>What to do...</h4>
            </legend>
            <div className="uk-margin">
              <input
                type="text"
                className="uk-input"
                name="text"
                placeholder="What todo..."
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="uk-margin ">
              <label>
                <input
                  type="radio"
                  className="uk-radio"
                  name="completed"
                  value="planned"
                  defaultChecked
                  onClick={this.handleChange}
                ></input>
                Planned
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  className="uk-radio"
                  name="completed"
                  value="completed"
                  onClick={this.handleChange}
                ></input>
                Completed
              </label>
            </div>
            <button type="submit" className="uk-button uk-button-primary">
              SUBMIT
            </button>
          </fieldset>
        </form>
        <hr></hr>
        <TodoList
          todos={this.state.todos}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleMore={this.handleMore}
        />
      </div>
    );
  }
}

export default Todos;
