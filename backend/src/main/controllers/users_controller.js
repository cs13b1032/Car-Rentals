"use strict";
const userService = require("../../services/users");

module.exports = {
  createUser: async (req, res) => {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
      } = req.body;

      // have to put them in routes file rather than in controller for joi validation
      if (!(firstName && email && mobile)) {
        res
          .status(400)
          .send("one of first_name or email or mobile is not provided");
      }
      const result = await userService.createUser(
        firstName,
        lastName,
        email,
        mobile
      );
      res.status(201).json(result);
    } catch (error) {
      res
        .status(400)
        .send(
          "Error in Create User: Service is not completly sophisticated yet"
        );
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.query.userId;

      // have to put them in routes file rather than in controller for joi validation
      if (!userId) {
        res
          .status(400)
          .send("one of first_name or email or mobile is not provided");
      }
      const result = await userService.getUser(userId);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(400)
        .send(
          "Error in Create User: Service is not completly sophisticated yet"
        );
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
      } = req.body;

      const userId = req.query.userId;
      // have to put them in routes file rather than in controller for joi validation
      if (!(firstName || lastName || email || mobile)) {
        res.status(400).send("atleast one update parameter to be provided");
      }
      if (!userId) {
        res.status(400).send("ouserId is not provided");
      }
      const result = await userService.updateUser(
        firstName,
        lastName,
        email,
        mobile,
        userId
      );
      res.status(201).json(result);
    } catch (error) {
      res
        .status(400)
        .send(
          "Error in Create User: Service is not completly sophisticated yet"
        );
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.query.userId;

      // have to put them in routes file rather than in controller for joi validation
      if (!userId) {
        res.status(400).send("ouserId is not provided");
      }
      const result = await userService.deleteUser(userId);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(400)
        .send(
          "Error in Create User: Service is not completly sophisticated yet"
        );
    }
  },
};
