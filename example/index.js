import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider, Query, Mutation } from "../src";
import "./index.css";

const store = createStore();
store.execute("CREATE TABLE counter (current number)");
store.execute("INSERT INTO counter VALUES (0)");

const Counter = () => (
  <Provider store={store}>
    <div className="Counter">
      <h2>Counter</h2>

      <Query sql="SELECT VALUE current FROM counter">
        {query => <h1>{query.data}</h1>}
      </Query>

      <div className="actions">
        <Mutation sql="UPDATE counter SET current = current - 1">
          {decrement => <button onClick={decrement}>-</button>}
        </Mutation>

        <Mutation sql="UPDATE counter SET current = current + 1">
          {increment => <button onClick={increment}>+</button>}
        </Mutation>
      </div>
    </div>
  </Provider>
);

ReactDOM.render(<Counter />, document.getElementById("root"));
