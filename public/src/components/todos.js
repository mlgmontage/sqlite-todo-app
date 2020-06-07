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
    return (
      <div>
        <form>
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
              ></input>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  className="uk-radio"
                  name="completed"
                  value="planned"
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
                ></input>
                Completed
              </label>
            </div>
            <button type="submit" className="uk-button uk-button-default">
              SUBMIT
            </button>
          </fieldset>
        </form>
        <hr></hr>
        <TodoList todos={this.state.todos} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default Todos;
