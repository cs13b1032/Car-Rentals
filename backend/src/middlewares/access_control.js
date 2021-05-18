"use strict";

const config = require("@config/config");

module.exports = async function (req, res, next) {
  try {

    // const userDetails = {
    //   id: userId,
    //   org_id: orgId,
    //   user_name: username,
    //   user_role: userRole,
    //   user_full_name: fullName,
    //   email: emailId,
    //   org_role: orgRole,
    //   org_name: orgName
    // };

    // req.userContext = userDetails;
  } catch (err) {
    //rejected
    return false;
  }

  next();
};
