import React, { Component } from "react";
import { connect } from "./Provider";

class Query extends Component {
  state = {
    data: null
  };

  constructor(props, context) {
    super(props, context);
    this._unsubscribe = this.props.store.subscribe(this.executeQuery);
  }

  componentDidMount() {
    this.executeQuery();
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  executeQuery = () => {
    const { store, sql, params } = this.props;
    const data = store.query(sql, params);
    this.setState({ data });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default connect(Query);
