import React, { Component } from "react";
import { compose, query, mutation } from "../../src";

class TodoList extends Component {
  state = {
    task: ""
  };

  handleChange = event => {
    this.setState({
      task: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.insertTodo(this.state);
    this.setState({ task: "" });
  };

  handleUpdate = todo => {
    this.props.updateTodo({
      id: todo.id,
      done: !todo.done
    });
  };

  handleDelete = (event, todo) => {
    event.preventDefault();
    this.props.deleteTodo(todo.id);
  };

  render() {
    const { todos } = this.props;

    return (
      <div className="TodoList">
        <h1>Todo List</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button type="submit">Save</button>
        </form>

        <ul>
          {todos.data.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => this.handleUpdate(todo)}
                />

                <a href="#" onClick={event => this.handleDelete(event, todo)}>
                  Delete
                </a>

                {todo.task}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const enhance = compose(
  query("SELECT * FROM example.todos", { name: "todos" }),
  mutation("INSERT INTO example.todos (task) VALUES (:task)", {
    name: "insertTodo"
  }),
  mutation("UPDATE example.todos SET done = :done WHERE id = :id", {
    name: "updateTodo"
  }),
  mutation("DELETE FROM example.todos WHERE id = ?", { name: "deleteTodo" })
);

export default enhance(TodoList);
