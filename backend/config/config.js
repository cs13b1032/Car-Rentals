"use strict";

const _ENVS = require("./envs");
const _DB = require("./database");
const appEnv = process.env.NODE_ENV || _ENVS.dev;
const _SETTINGS = require('./settings');

const knex = require("knex")({
  client: "pg",
  connection:
    _DB.PG_CONNECTION_OBJECT[appEnv] || _DB.PG_CONNECTION_OBJECT.default,
  searchPath: ["knex", "public"],
  pool: {
    afterCreate: function (connection, callback) {
      connection.query('SET timezone="GMT";', function (err) {
        console.log(`DB connection created for env ${appEnv}`);
        callback(err, connection);
      });
    },
  },
  acquireConnectionTimeout: 10000,
});

module.exports = {
  getDb: () => {
    return knex;
  },
  getConfig: (key, defaultValue) => {
    let currentObj = _SETTINGS;
    const props = key.split('.');
    for (let i = 0, len = props.length; i < len; i++) {
      if (Object.prototype.hasOwnProperty.call(currentObj, props[i])) {
        currentObj = currentObj[props[i]];
      } else if (defaultValue) {
        return defaultValue;
      } else {
        return null;
      }
    }

    return currentObj;
  }
};
