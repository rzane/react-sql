import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider } from "../src";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import "./index.css";

const store = createStore();
const storage = ""; // or localStorage

const prepare = `
CREATE ${storage} DATABASE IF NOT EXISTS example;
-- ATTACH ${storage} DATABASE example;
CREATE TABLE IF NOT EXISTS example.counter (current NUMBER);
INSERT INTO example.counter VALUES (0);

CREATE TABLE IF NOT EXISTS example.todos (
  id INT NON NULL PRIMARY KEY AUTO_INCREMENT,
  task STRING NON NULL,
  done BOOLEAN DEFAULT false
);
INSERT INTO example.todos (task) VALUES ("Take out the trash");
`;

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Counter />
      <TodoList />
    </Provider>,
    document.getElementById("root")
  );
};

store.execute(prepare).then(render);
