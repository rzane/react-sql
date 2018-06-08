import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import { createStore, Provider } from "../src";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import Blog from "./components/Blog";

const store = createStore();

// const storage = null;
const storage = "localStorage";

const schema = `
CREATE TABLE IF NOT EXISTS example.counter (
  current NUMBER
);

CREATE TABLE IF NOT EXISTS example.todos (
  id INT NON NULL PRIMARY KEY AUTO_INCREMENT,
  task STRING NON NULL,
  done BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS example.posts (
  id INT NON NULL PRIMARY KEY,
  body STRING NON NULL,
  title STRING NON NULL,
  userId INT NON NULL
);

CREATE TABLE IF NOT EXISTS example.users (
  id INT NON NULL PRIMARY KEY,
  name STRING NON NULL
);
`;

const createDatabase = () => {
  if (!storage) {
    return store.execute(`CREATE DATABASE example;`);
  }

  return store.execute(`
    CREATE ${storage} DATABASE IF NOT EXISTS example;
    ATTACH ${storage} DATABASE example;
  `);
};

const createSchema = () => {
  return store.execute(schema);
};

const seed = async () => {
  const [counter, todos] = await Promise.all([
    store.execute("SELECT VALUE COUNT(*) FROM example.counter"),
    store.execute("SELECT VALUE COUNT(*) FROM example.todos")
  ]);

  if (counter === 0) {
    store.execute("INSERT INTO example.counter VALUES (0)");
  }

  if (todos === 0) {
    store.execute('INSERT INTO example.todos VALUES ("Take out the trash")');
  }
};

const Home = () => (
  <h1>Choose a demo</h1>
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <nav>
        <div className="container">
          <Link to="counter">Counter</Link>
          <Link to="todos">Todo List</Link>
          <Link to="blog">Blog</Link>
        </div>
      </nav>

      <main className="container">
        <Router>
          <Counter path="counter" />
          <TodoList path="todos" />
          <Blog path="blog" />
        </Router>
      </main>
    </Provider>,
    document.getElementById("root")
  );
};

createDatabase()
  .then(createSchema)
  .then(seed)
  .then(render);
