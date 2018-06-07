import React, { Component } from "react";

const Context = React.createContext("resql");

const getName = component => {
  return component.displayName || component.name || "Component";
};

export const connect = WrappedComponent => {
  const Enhanced = props => (
    <Context.Consumer>
      {store => <WrappedComponent store={store} {...props} />}
    </Context.Consumer>
  );

  Enhanced.displayName = `Connect(${getName(WrappedComponent)})`;
  return Enhanced;
};

export default class Provider extends Component {
  render() {
    return (
      <Context.Provider
        value={this.props.store}
        children={this.props.children}
      />
    );
  }
}
