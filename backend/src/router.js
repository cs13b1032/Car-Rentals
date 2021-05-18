"use strict";

module.exports = (app) => {
  const express = require("express");
  const helmet = require("helmet");
  const requestIp = require("request-ip");
  const accessControl = require("@middlewares/access_control");
  const { allowedRoutes } = require("../config/routes");

  const compression = require("compression");
  app.use(express.static(__dirname + "/"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  app.set("views", __dirname);

  app.use(compression());
  app.use(requestIp.mw());
  app.use(helmet());
  app.use(helmet.frameguard({ action: "deny" }));
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "must-revalidate, proxy-revalidate");
    express.json()(req, res, (err) => {
      if (err) {
        return res.sendStatus(400);
      }
      next();
    });
  });

  // app.use(accessControl);

  for (const route in allowedRoutes) {
    const routeDef = allowedRoutes[route];

    switch (routeDef.method) {
      case "get":
        app.get(routeDef.path, routeDef.function);

        break;
      case "post":
        app.post(routeDef.path, routeDef.function);

      case "put":
        app.put(routeDef.path, routeDef.function);

        break;
      case "delete":
        app.delete(routeDef.path, routeDef.function);

        break;
      case "patch":
        app.patch(routeDef.path, routeDef.function);

        break;
      default:
        console.log(
          `Bad method ${routeDef.method} for resource ${routeDef.path} in route definition`
        );
    }
  }

  return app;
};
