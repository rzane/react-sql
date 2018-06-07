import alasql from "alasql";
import { EventEmitter } from "events";

export const createStore = name => {
  const db = new alasql.Database(name);
  const events = new EventEmitter();

  const subscribe = callback => {
    events.on("mutate", callback);

    return () => {
      events.off("mutate", callback);
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
