import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "./Provider";

class Query extends Component {
  static propTypes = {
    sql: PropTypes.string.isRequired,
    initial: PropTypes.any,
    params: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
  };

  static defaultProps = {
    initial: [],
    params: []
  };

  constructor(props, context) {
    super(props, context);

    this.state = { loading: true, data: props.initial };
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

  executeQuery = async () => {
    this.setState({ loading: true });
    const { store, sql, params } = this.props;
    const data = await store.query(sql, params);
    this.setState({ data, loading: false });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default connect(Query);
