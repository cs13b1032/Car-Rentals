'use strict';
const DB = require('./config/database');
const _ENVS = require('./config/envs');
const appEnv = process.env.NODE_ENV || _ENVS.dev;

module.exports = {
  [appEnv]: {
    client: 'pg',
    connection: DB.PG_CONNECTION_OBJECT[appEnv],
    migrations: {
      directory: __dirname + '/db/migrations',
      schemaName: 'public',
      tableName: 'knex_migrations'
    }
  }
};
