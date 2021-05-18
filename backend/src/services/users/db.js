const config = require("@config/config");
const db = config.getDb();

async function getUserDetails(userId) {
  return db.select("*").from("user_management.users").where("id", userId);
}

module.exports = {
  getUserDetails,
};
