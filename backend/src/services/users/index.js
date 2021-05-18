"use strict";

const config = require("@config/config");
const db = config.getDb();

const { createUserObj, updateUserObj } = require("./helper");

const { getUserDetails } = require("./db");

const _this = (module.exports = {
  createUser: async (firstName, lastName, email, mobile) => {
    try {
      const userObj = createUserObj(firstName, lastName, email, mobile);
      const response = await db.transaction(async (trx) => {
        return db("user_management.users")
          .transacting(trx)
          .insert(userObj)
          .returning("id");
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (userId) => {
    try {
      const userDetails = await getUserDetails(userId);
      return userDetails;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (firstName, lastName, email, mobile, userId) => {
    try {
      const userObj = updateUserObj(firstName, lastName, email, mobile);
      const response = await db.transaction(async (trx) => {
        return db("user_management.users")
          .transacting(trx)
          .update(userObj)
          .where("id", userId)
          .returning("id");
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await db.transaction(async (trx) => {
        return db("user_management.users")
          .transacting(trx)
          .where("id", userId)
          .del();
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
});
