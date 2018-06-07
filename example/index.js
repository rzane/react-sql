import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider } from "../src";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import "./index.css";

const store = createStore();

// const storage = "INDEXEDDB";
// const storage = "localStorage";
const storage = null;

const schema = `
CREATE TABLE IF NOT EXISTS example.counter (
  current NUMBER
);

CREATE TABLE IF NOT EXISTS example.todos (
  id INT NON NULL PRIMARY KEY AUTO_INCREMENT,
  task STRING NON NULL,
  done BOOLEAN DEFAULT false
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

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Counter />
      <TodoList />
    </Provider>,
    document.getElementById("root")
  );
};

createDatabase()
  .then(createSchema)
  .then(seed)
  .then(render);
