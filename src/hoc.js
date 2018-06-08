import React from 'react';
import Query from './Query';
import Mutation from './Mutation';
import Actions from './Actions';

const call = (maybeFn, ...args) => {
  if (typeof maybeFn === "function") {
    return maybeFn(...args);
  }

  return maybeFn;
};

const wrap = (SqlComponent, operation) => (sql, {
  options,
  name = operation,
  props = query => ({ [name]: query })
}) => WrappedComponent => wrappedProps => (
  <SqlComponent sql={sql} {...call(options, wrappedProps)}>
    {result => (
      <WrappedComponent
        {...wrappedProps}
        {...call(props, result, wrappedProps)}
      />
    )}
  </SqlComponent>
);

export const query = wrap(Query, "query");
export const mutation = wrap(Mutation, "mutate");

export const withActions = actions => WrappedComponent => props => (
  <Actions {...actions}>
    {handlers => <WrappedComponent {...props} {...handlers} />}
  </Actions>
);

export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
