import React, { Component } from "react";
import { connect } from "./Provider";

class Mutation extends Component {
  handleMutate = params => {
    this.props.store.mutate(this.props.sql, params);
  };

  render() {
    return this.props.children(this.handleMutate);
  }
}

export default connect(Mutation);
