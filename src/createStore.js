import './monkeys'
import alasql from "alasql";
import { EventEmitter } from "events";

const createStore = () => {
  const events = new EventEmitter();

  const subscribe = callback => {
    events.addListener("mutate", callback);

    return () => {
      events.removeListener("mutate", callback);
    };
  };

  const query = (sql, params) => {
    return alasql.promise(sql, params);
  };

  const mutate = async (sql, params) => {
    const result = await alasql.promise(sql, params);
    events.emit("mutate", sql, params, result);
    return result;
  };

  return {
    execute: query,
    query,
    mutate,
    subscribe
  };
};

export default createStore;
