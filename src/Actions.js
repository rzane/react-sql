import { Component } from 'react';
import { connect } from './Provider';

const createHandlers = ({ store, children: _children, ...actions }) => {
  return Object.entries(actions).reduce(
    (acc, [name, action]) => ({
      ...acc,
      [name]: (...args) => action(store, ...args)
    }),
    {}
  );
}

class Actions extends Component {
  handlers = createHandlers(this.props)

  render() {
    return this.props.children(this.handlers)
  }
}

export default connect(Actions);
