import React from "react";
import PropTypes from "prop-types";

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

const Provider = ({ store, children }) => (
  <Context.Provider value={store} children={children} />
);

Provider.propTypes = {
  store: PropTypes.shape({
    execute: PropTypes.func.isRequired,
    query: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired
  })
};

export default Provider;
