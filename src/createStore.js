import alasql from "alasql";
import { EventEmitter } from "events";

const createStore = ({ name = "store" } = {}) => {
  const db = new alasql.Database(name);
  const events = new EventEmitter();

  const subscribe = callback => {
    events.addListener("mutate", callback);

    return () => {
      events.removeListener("mutate", callback);
    };
  };

  const query = (sql, params) => {
    return db.exec(sql, params);
  };

  const mutate = (sql, params) => {
    const result = db.exec(sql, params);
    events.emit("mutate", sql, params, result);
    return result;
  };

  return {
    query,
    mutate,
    execute: query,
    subscribe
  };
};

export default createStore;
