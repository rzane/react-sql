import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider, Query, Mutation } from "../src";
import "./index.css";

const store = createStore();
const storage = "INDEXEDDB"; // or localStorage

const prepare = `
CREATE ${storage} DATABASE IF NOT EXISTS example;
ATTACH ${storage} DATABASE example;
CREATE TABLE IF NOT EXISTS example.counter (current number);
INSERT INTO example.counter VALUES (0);
`;

const Counter = () => (
  <Provider store={store}>
    <div className="Counter">
      <h2>Counter</h2>

      <Query sql="SELECT VALUE current FROM example.counter">
        {query => <h1>{query.data}</h1>}
      </Query>

      <div className="actions">
        <Mutation sql="UPDATE example.counter SET current = current - 1">
          {decrement => <button onClick={decrement}>-</button>}
        </Mutation>

        <Mutation sql="UPDATE example.counter SET current = current + 1">
          {increment => <button onClick={increment}>+</button>}
        </Mutation>
      </div>
    </div>
  </Provider>
);

const render = () => {
  ReactDOM.render(<Counter />, document.getElementById("root"));
};

store.execute(prepare).then(render);
