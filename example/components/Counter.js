import React from "react";
import { Query, Mutation } from "../../src";

const Counter = () => (
  <div className="Counter">
    <h2>Counter</h2>

    <Query sql="SELECT VALUE current FROM example.counter">
      {query => <h1>{query.data}</h1>}
    </Query>

    <Mutation sql="UPDATE example.counter SET current = current - 1">
      {decrement => (
        <button className="negative" onClick={decrement}>
          -
        </button>
      )}
    </Mutation>

    <Mutation sql="UPDATE example.counter SET current = current + 1">
      {increment => (
        <button className="positive" onClick={increment}>
          +
        </button>
      )}
    </Mutation>
  </div>
);

export default Counter;
