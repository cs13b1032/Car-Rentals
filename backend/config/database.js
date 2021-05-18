"use strict";

const _ENVS = require("./envs");

module.exports = {
  PG_CONNECTION_OBJECT: {
    [_ENVS.dev]: {
      host: `localhost`,
      database: `car_rentals`,
      port: 5432,
      user: process.env.USER,
      password: "",
    },
  }
};
