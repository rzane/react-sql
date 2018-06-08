# React SQL

This is a __really good__ *bad* idea.

Here's the premise:

1. React is a declarative language for building user interfaces.
2. SQL is a declarative language for storing and manipulating data.

Doesn't that sound like a good fit? The answer is: yeah, kind of?

## Examples

* [Counter](/example/components/Counter.js)
* [Todo List](/example/components/TodoList.js)
* [Blog](/example/components/Blog.js)

## How does it work?

Under the hood it uses [AlaSQL](https://github.com/agershun/alasql), which is an incredibly cool in-memory SQL database.

## Really, you don't think this is cool?

```jsx
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
```
