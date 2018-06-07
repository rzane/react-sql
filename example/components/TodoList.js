import React, { Component } from "react";
import { Query, Mutation } from "../../src";

const Todo = ({ todo }) => (
  <Mutation sql="UPDATE example.todos SET done = :done WHERE id = :id">
    {update => (
      <li>
        <label>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => update({ id: todo.id, done: !todo.done })}
          />

          {todo.task}
        </label>
      </li>
    )}
  </Mutation>
);

class TodoList extends Component {
  state = {
    task: ""
  };

  handleChange = event => {
    this.setState({ task: event.target.value });
  };

  handleSubmit = (event, insert) => {
    event.preventDefault();
    insert(this.state);
    this.setState({ task: "" });
  };

  render() {
    return (
      <div className="TodoList">
        <h1>Todo List</h1>

        <Mutation sql="INSERT INTO example.todos (task) VALUES (:task)">
          {insert => (
            <form onSubmit={event => this.handleSubmit(event, insert)}>
              <input
                type="text"
                value={this.state.task}
                onChange={this.handleChange}
              />
              <button type="submit">Save</button>
            </form>
          )}
        </Mutation>

        <Query sql="SELECT * FROM example.todos">
          {todos => (
            <ul>
              {todos.data.map(todo => <Todo key={todo.id} todo={todo} />)}
            </ul>
          )}
        </Query>
      </div>
    );
  }
}

export default TodoList;
