import alasql from "alasql";

const LS = alasql.engines.LOCALSTORAGE;

/**
 * Fix primary key generation
 */
LS.intoTable = function(databaseid, tableid, value, _columns, cb) {
  var res = value.length;
  var tb = LS.restoreTable(databaseid, tableid);
  for (var columnid in tb.identities) {
    var ident = tb.identities[columnid];

    for (var index in value) {
      value[index][columnid] = ident.value;
      ident.value += ident.step;
    }
  }
  if (!tb.data) tb.data = [];
  tb.data = tb.data.concat(value);
  LS.storeTable(databaseid, tableid);
  if (cb) res = cb(res);
  return res;
};
