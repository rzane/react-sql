import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider, Query, Mutation } from "./resql";

const store = createStore();
store.execute("CREATE TABLE counter ([value] number)");
store.execute("INSERT INTO counter VALUES (0)");

const App = () => (
  <Provider store={store}>
    <Mutation sql="UPDATE counter SET [value] = [value] - 1">
      {decrement => <button onClick={decrement}>-</button>}
    </Mutation>

    <Query sql="SELECT [value] FROM counter">
      {({ data: [{ value }] }) => value}
    </Query>

    <Mutation sql="UPDATE counter SET [value] = [value] + 1">
      {increment => <button onClick={increment}>+</button>}
    </Mutation>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
