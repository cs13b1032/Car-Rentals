"use strict";

const userRoutes = require("../src/main/routes/car_rental_routes");
const carRentalRoutes = require("../src/main/routes/user_routes");

const allowedRoutes = ((routes) => {
  const allowedRoutes = {};
  for (const rt in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, rt)) {
      for (const key in routes[rt]) {
        if (key in allowedRoutes) {
          throw Error(`Duplicate Route Declaration:${key}`);
        } else {
          allowedRoutes[key] = routes[rt][key];
        }
      }
    }
  }
  return allowedRoutes;
})([userRoutes, carRentalRoutes]);

module.exports = {
  allowedRoutes,
};
