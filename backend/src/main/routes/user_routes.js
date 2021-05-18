"use strict";

const userController = require("../controllers/users_controller");

module.exports = {
  createUser: {
    method: "post",
    path: "/user",
    function: userController.createUser,
  },
  getUser: {
    method: "get",
    path: "/user",
    function: userController.getUser,
  },
  updateUser: {
    method: "patch",
    path: "/user",
    function: userController.updateUser,
  },
  deleteUser: {
    method: "delete",
    path: "/user",
    function: userController.deleteUser,
  },
};
